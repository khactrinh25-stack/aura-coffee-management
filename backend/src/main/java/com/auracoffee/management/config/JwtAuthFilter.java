package com.auracoffee.management.config;

import com.auracoffee.management.dto.ErrorResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Set;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";

    private static final Set<String> PUBLIC_PATHS = Set.of("/api/auth/login");

    /**
     * GET endpoints accessible by both Admin and NhanVien
     */
    private static final List<String> GET_ALLOWED_PREFIXES = List.of(
            "/api/do-uong",
            "/api/danh-muc",
            "/api/khach-hang",
            "/api/hoa-don"
    );

    private final JwtUtil jwtUtil;
    private final ObjectMapper objectMapper;

    public JwtAuthFilter(JwtUtil jwtUtil, ObjectMapper objectMapper) {
        this.jwtUtil = jwtUtil;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        String method = request.getMethod();

        // Allow CORS preflight (OPTIONS) requests
        if ("OPTIONS".equalsIgnoreCase(method)) {
            response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
            response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        // Allow public paths (login)
        if (PUBLIC_PATHS.contains(path)) {
            filterChain.doFilter(request, response);
            return;
        }

        // Extract token
        String authHeader = request.getHeader(AUTHORIZATION_HEADER);
        if (authHeader == null || !authHeader.startsWith(BEARER_PREFIX)) {
            sendUnauthorized(response, "Thiếu token xác thực");
            return;
        }

        String token = authHeader.substring(BEARER_PREFIX.length());
        if (!jwtUtil.validateToken(token)) {
            sendUnauthorized(response, "Token không hợp lệ hoặc đã hết hạn");
            return;
        }

        Claims claims = jwtUtil.parseToken(token);
        String vaiTro = claims.get("vaiTro", String.class);
        Integer maNhanVien = claims.get("maNhanVien", Integer.class);
        String tenDangNhap = claims.getSubject();

        // Check RBAC

        if ("GET".equalsIgnoreCase(method)) {
            // GET: allow Admin + NhanVien for these prefixes
            boolean allowed = GET_ALLOWED_PREFIXES.stream().anyMatch(path::startsWith);
            if (!allowed) {
                sendForbidden(response, "Không có quyền truy cập");
                return;
            }
            // Even if allowed by prefix, NhanVien can only access POS-related endpoints
            if ("NhanVien".equals(vaiTro) && path.startsWith("/api/khach-hang")) {
                // NhanVien can search customers by phone (GET) for POS
                // This is allowed
            }
        } else if ("POST".equalsIgnoreCase(method)) {
            // POST: check specific endpoints
            if (path.startsWith("/api/khach-hang")) {
                // Both Admin and NhanVien can create customers from POS
                // Allow
            } else if (path.startsWith("/api/hoa-don")) {
                // Only NhanVien can create invoices (Admin does not sell)
                if (!"NhanVien".equals(vaiTro)) {
                    sendForbidden(response, "Chỉ Nhân viên mới có quyền tạo hóa đơn");
                    return;
                }
            } else {
                // All other POST: Admin only
                if (!"Admin".equals(vaiTro)) {
                    sendForbidden(response, "Chỉ Admin mới có quyền thực hiện thao tác này");
                    return;
                }
            }
        } else {
            // PUT, PATCH, DELETE: Admin only
            if (!"Admin".equals(vaiTro)) {
                sendForbidden(response, "Chỉ Admin mới có quyền thực hiện thao tác này");
                return;
            }
        }

        // Set attributes for controllers
        request.setAttribute("maNhanVien", maNhanVien);
        request.setAttribute("vaiTro", vaiTro);
        request.setAttribute("tenDangNhap", tenDangNhap);

        filterChain.doFilter(request, response);
    }

    private void sendUnauthorized(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json;charset=UTF-8");
        objectMapper.writeValue(response.getOutputStream(), new ErrorResponse(message));
    }

    private void sendForbidden(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType("application/json;charset=UTF-8");
        objectMapper.writeValue(response.getOutputStream(), new ErrorResponse(message));
    }
}