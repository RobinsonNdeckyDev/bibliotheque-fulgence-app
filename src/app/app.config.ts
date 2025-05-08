import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptor/authInterceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient(
            withInterceptors([authInterceptor])
        ),
        provideToastr(),
        provideAnimations(),
        providePrimeNG({
            ripple: true,
            inputStyle: 'filled',
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.my-app-dark'
                }
            }
        })
    ]
};
