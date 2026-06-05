package com.auracoffee.management.service;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private static final int OTP_LENGTH = 4;
    private static final int OTP_EXPIRY_MINUTES = 5;
    private static final SecureRandom RANDOM = new SecureRandom();

    // In-memory OTP storage: key = maNhanVien, value = OtpData
    private final ConcurrentHashMap<Integer, OtpData> otpStore = new ConcurrentHashMap<>();

    /**
     * Generate a 4-digit OTP for the given employee and store it.
     */
    public String generateOtp(Integer maNhanVien) {
        int otpInt = 1000 + RANDOM.nextInt(9000);
        String otpCode = String.valueOf(otpInt);

        OtpData otpData = new OtpData(otpCode, LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES), false);
        otpStore.put(maNhanVien, otpData);

        return otpCode;
    }

    /**
     * Verify the OTP for the given employee.
     * If valid, marks as verified (so changePassword can proceed).
     */
    public boolean verifyOtp(Integer maNhanVien, String otpCode) {
        OtpData otpData = otpStore.get(maNhanVien);

        if (otpData == null) {
            return false;
        }

        // Check expiry
        if (LocalDateTime.now().isAfter(otpData.expiryTime)) {
            otpStore.remove(maNhanVien);
            return false;
        }

        // Check OTP match
        if (!otpData.otpCode.equals(otpCode)) {
            return false;
        }

        // Mark as verified (do NOT remove - changePassword will check this)
        otpData.verified = true;
        return true;
    }

    /**
     * Check if OTP has been verified (for changePassword endpoint).
     */
    public boolean isOtpVerified(Integer maNhanVien) {
        OtpData otpData = otpStore.get(maNhanVien);
        if (otpData == null) {
            return false;
        }
        if (LocalDateTime.now().isAfter(otpData.expiryTime)) {
            otpStore.remove(maNhanVien);
            return false;
        }
        return otpData.verified;
    }

    /**
     * Remove OTP for an employee (e.g., after successful password change).
     */
    public void clearOtp(Integer maNhanVien) {
        otpStore.remove(maNhanVien);
    }

    /**
     * Check if OTP is pending (exists and not expired) for an employee.
     */
    public boolean hasPendingOtp(Integer maNhanVien) {
        OtpData otpData = otpStore.get(maNhanVien);
        if (otpData == null) {
            return false;
        }
        if (LocalDateTime.now().isAfter(otpData.expiryTime)) {
            otpStore.remove(maNhanVien);
            return false;
        }
        return true;
    }

    // Inner class to hold OTP data
    private static class OtpData {
        private final String otpCode;
        private final LocalDateTime expiryTime;
        private boolean verified;

        public OtpData(String otpCode, LocalDateTime expiryTime, boolean verified) {
            this.otpCode = otpCode;
            this.expiryTime = expiryTime;
            this.verified = verified;
        }
    }
}