import { authService } from "@/services/auth";

export function setCookie(token, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = token + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(token) {
    let name = token + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function checkCookie() {
    let token = getCookie("token");
    try {
        if (!token) {
            throw new Error("Token is not exist")
        }
        return true;
    }
    catch (err) {
        return false;
    }
}