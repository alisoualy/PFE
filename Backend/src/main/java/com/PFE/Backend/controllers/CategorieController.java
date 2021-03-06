package com.PFE.Backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PFE.Backend.Services.CategorieService;
import com.PFE.Backend.entities.Boundary;
import com.PFE.Backend.entities.Categorie;


import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*")
@RequestMapping(value = "Categorie")
@AllArgsConstructor
@RestController
public class CategorieController {
	
	private final CategorieService categorieService;
	
	 @GetMapping(value = "/find/all")
	    public List<Categorie> findAll( ){
	        return categorieService.findAll();
	    }
	 @PostMapping(value = "/add_Categorie")
	    public void save(@RequestBody Categorie category){
		 categorieService.save(category);
	    }
}
