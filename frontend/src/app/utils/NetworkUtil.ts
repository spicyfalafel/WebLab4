export class NetworkUtil {

    static clearStorage(): void {
        localStorage.clear();
    }

    static clearUserData(): void {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('basic64Credentials');
    }

    static checkUserData(): boolean {
        return localStorage.getItem('currentUser') !== null && localStorage.getItem('basic64Credentials') !== null;
    }

    static authFailed(): void {
        this.clearUserData();
        window.location.href = '/login';
    }
}
