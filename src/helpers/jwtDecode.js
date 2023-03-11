export function jwtDecode(token) {
        try {
            const decoded = JSON.parse(atob(token.split(".")[1]));
            return decoded;
        } catch (err) {
            console.log(err);
        }
    }