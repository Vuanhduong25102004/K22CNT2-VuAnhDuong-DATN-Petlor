package com.example.petlorshop.config;

import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FilterConfig {

    @Autowired
    private EntityManager entityManager;

    public void enableDeletedProductFilter(boolean isDeleted) {
        Session session = entityManager.unwrap(Session.class);
        session.enableFilter("deletedProductFilter").setParameter("isDeleted", isDeleted);
    }

    public void disableDeletedProductFilter() {
        Session session = entityManager.unwrap(Session.class);
        session.disableFilter("deletedProductFilter");
    }
}
