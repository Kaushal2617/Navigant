package com.navigant.aspect;

import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.navigant.model.Lead;
import com.navigant.dto.LeadResponse;
import com.navigant.security.AdminUserDetails;
import com.navigant.service.ActivityLogService;

import jakarta.servlet.http.HttpServletRequest;

/**
 * Aspect to automatically log important state changes.
 */
@Aspect
@Component
public class ActivityLogAspect {

    private final ActivityLogService logService;

    public ActivityLogAspect(ActivityLogService logService) {
        this.logService = logService;
    }

    // --- Helper to get IP ---
    private String getClientIp() {
        if (RequestContextHolder.getRequestAttributes() == null)
            return "UNKNOWN";
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
                .getRequest();
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0];
        }
        return request.getRemoteAddr();
    }

    // --- Helper to get Current Admin ID ---
    private String getCurrentAdminId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof AdminUserDetails) {
            return ((AdminUserDetails) auth.getPrincipal()).getAdmin().getId();
        }
        return "SYSTEM"; // Or "PUBLIC"
    }

    // === LEAD MODULE ===

    @AfterReturning(pointcut = "execution(* com.navigant.service.LeadService.createLead(..))", returning = "result")
    public void logLeadCreation(Object result) {
        if (result instanceof LeadResponse) {
            LeadResponse lead = (LeadResponse) result;
            logService.log("PUBLIC", "CREATE", "LEAD", lead.getId(),
                    "New Lead: " + lead.getServiceType(), getClientIp());
        }
    }

    @AfterReturning(pointcut = "execution(* com.navigant.service.LeadService.updateStatus(..)) && args(id, status, adminId)", argNames = "id,status,adminId,result", returning = "result")
    public void logLeadStatusUpdate(String id, String status, String adminId, Object result) {
        logService.log(adminId, "UPDATE_STATUS", "LEAD", id, "Status changed to " + status, getClientIp());
    }

    // === JOB APPLICATION MODULE ===

    @AfterReturning(pointcut = "execution(* com.navigant.service.JobApplicationService.updateApplicationByStatus(..)) && args(id, status, adminId)", argNames = "id,status,adminId,result", returning = "result")
    public void logAppStatusUpdate(String id, String status, String adminId, Object result) {
        logService.log(adminId, "UPDATE_STATUS", "APPLICATION", id, "Status changed to " + status, getClientIp());
    }

    // === AUTH MODULE ===
    // We can target specific login success logic if exists, or controller
}
