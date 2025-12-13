package com.example.petlorshop.repositories;


import com.example.petlorshop.models.ThuCung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThuCungRepository extends JpaRepository<ThuCung, Integer> {
}
