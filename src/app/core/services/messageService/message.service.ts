import { Injectable } from '@angular/core';
import Toastify from 'toastify-js';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
    private defaultDuration = 3000;

    showSuccess(message: string, duration: number = this.defaultDuration) {
        Toastify({
        text: message,
        duration: duration,
        gravity: "top",
        position: "right",
        style: {
            background: "#2C3E50",
            borderRadius: "8px",
            padding: "12px 24px",
        },
        onClick: function(){}
        }).showToast();
    }

    showError(message: string, duration: number = this.defaultDuration) {
        Toastify({
          text: message,
          duration: duration,
          gravity: "top",
          position: "right",
          style: {
            background: "#E74C3C",
            borderRadius: "8px",
            padding: "12px 24px",
          },
          onClick: function(){}
        }).showToast();
    }

    showWarning(message: string, duration: number = this.defaultDuration) {
        Toastify({
          text: message,
          duration: duration,
          gravity: "top",
          position: "right",
          style: {
            background: "#E67E22",
            borderRadius: "8px",
            padding: "12px 24px",
          },
          onClick: function(){}
        }).showToast();
    }

    showInfo(message: string, duration: number = this.defaultDuration) {
        Toastify({
          text: message,
          duration: duration,
          gravity: "top",
          position: "right",
          style: {
            background: "#3498DB",
            borderRadius: "8px",
            padding: "12px 24px",
          },
          onClick: function(){}
        }).showToast();
    }
}
