import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/authService/auth.service';
import { MessageService } from './../../../core/services/messageService/message.service';
import { Auteur } from '../../../core/models/auteur';
import { AuteurService } from '../../../core/services/auteurService/auteur.service';
import { RegisterRequest } from '../../../core/models/register-request';


@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    showPassword: boolean = false;
    registerForm!: FormGroup;

    private fb = inject(FormBuilder);
    private router = inject(Router);
    private messageService = inject(MessageService);
    private authService = inject(AuthService);
    private auteurService = inject(AuteurService);

    // Initialisation du composant
    ngOnInit(): void {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            prenom: ['', Validators.required],
            nom: ['', Validators.required],
            adresse: ['', Validators.required],
            telephone: ['', Validators.required],
            description: ['', Validators.required],
            photoProfil: [''],
        });
    }

    // Ajouter un auteur
    registerAuteur(newAuteur: RegisterRequest) {
        this.authService.register(newAuteur).subscribe({
            next: (data) => {
                this.messageService.showSuccess('inscription réussie avec succès');
            },
            error: (error) => {
                console.error('Erreur lors de l\'inscription:', error);
                this.messageService.showError('Erreur lors de l\'inscription:');
            }
        });
    }

    onRegister() {
        if (this.registerForm.valid) {
            const newAuteur: RegisterRequest = {
                email: this.registerForm.value.email,
                password: this.registerForm.value.password,
                prenom: this.registerForm.value.prenom,
                nom: this.registerForm.value.nom,
                adresse: this.registerForm.value.adresse,
                telephone: this.registerForm.value.telephone,
                description: this.registerForm.value.description,
                photoProfil: this.registerForm.value.photoProfil || 'default.jpg',
                role: 'AUTEUR'
            };

            console.log("newAuteur: ", newAuteur);
            this.registerAuteur(newAuteur);
            this.registerForm.reset();
            this.router.navigate(['/login']);
        }else {
            this.messageService.showError('Veuillez remplir correctement tous les champs requis ,Erreur de validation');
        }
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }


}
