package com.auracoffee.management.dto;

import java.time.LocalDate;

public class RevenueReportItem {
    private LocalDate date;
    private Integer revenue;
    private Integer invoiceCount;

    public RevenueReportItem() {
    }

    public RevenueReportItem(LocalDate date, Integer revenue, Integer invoiceCount) {
        this.date = date;
        this.revenue = revenue;
        this.invoiceCount = invoiceCount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getRevenue() {
        return revenue;
    }

    public void setRevenue(Integer revenue) {
        this.revenue = revenue;
    }

    public Integer getInvoiceCount() {
        return invoiceCount;
    }

    public void setInvoiceCount(Integer invoiceCount) {
        this.invoiceCount = invoiceCount;
    }
}
