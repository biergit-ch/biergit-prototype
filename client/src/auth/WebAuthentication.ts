import autobind from 'autobind-decorator';
import history from '../utils/History';
import { Auth0Authentication } from './Auth0Authentication';
import { Auth0DecodedHash, Auth0Error, WebAuth } from 'auth0-js';
import { UserProfile } from '../models';
/**
 * Web based Auth0 authentication
 *
 * @export
 * @class WebAuthentication
 * @implements {Auth0Authentication}
 */
export class WebAuthentication implements Auth0Authentication {
  /**
   * @property
   * @readonly
   * @memberof WebAuthentication
   */
  get accessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  /**
   * @private
   * @memberof WebAuthentication
   */
  requestedScopes = 'openid profile read:messages write:messages';

  /**
   * @property
   * @private
   * @type {WebAuth}
   * @memberof WebAuthenticationManager
   */
  auth0: WebAuth = new WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URI,
    responseType: 'token id_token',
    scope: this.requestedScopes,
  });

  get authenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at')!);
    return new Date().getTime() < expiresAt;
  }

  /**
   * @property
   * @type {UserProfile}
   * @memberof WebAuthentication
   */
  userProfile: UserProfile | null;

  /**
   * Get user profile from local storage
   *
   * @returns {Promise<UserProfile>}
   * @memberof WebAuthentication
   */
  @autobind
  getProfile(): Promise<UserProfile> {
    return new Promise((resolve, reject) => {
      let accessToken = this.accessToken;
      this.auth0.client.userInfo(
        accessToken,
        (error: Auth0Error, profile: UserProfile) => {
          if (error) {
            reject(error);
          } else {
            this.userProfile = profile;
            resolve(this.userProfile);
          }
        },
      );
    });
  }

  @autobind
  login(): void {
    this.auth0.authorize();
  }

  @autobind
  handleAuthentication(): void {
    this.auth0.parseHash((e: Auth0Error, result: Auth0DecodedHash) => {
      if (result && result.accessToken && result.idToken) {
        this.setSession(result);
        history.replace('/home');
      } else if (e) {
        history.replace('/home');
        // tslint:disable-next-line:no-console
        console.error(e);
        alert(`Error: ${e.error}. Check the console for further details.`);
      }
    });
  }

  @autobind
  setSession(authResult: Auth0DecodedHash): void {
    const { accessToken, expiresIn, idToken, scope } = authResult;
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(expiresIn! * 1000 + new Date().getTime());
    // If there is a value on the `scope` param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    // tslint:disable-next-line:no-string-literal
    const scopes = scope || this.requestedScopes || '';
    // const scopes = authResult.scope || this.requestedScopes || '';
    localStorage.setItem('access_token', accessToken!);
    localStorage.setItem('id_token', idToken!);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));
    // navigate to the home route
    history.replace('/home');
  }

  @autobind
  logout(): void {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.userProfile = null;
    // navigate to the home route
    history.replace('/home');
  }

  @autobind
  userHasScopes(scopes: string[]): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')!).split(
      ' ',
    );
    return scopes.every(scope => grantedScopes.includes(scope));
  }
}