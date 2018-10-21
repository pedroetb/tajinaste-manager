import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiAuthInterceptor } from './api-auth-interceptor';
import { ApiOriginInterceptor } from './api-origin-interceptor';
import { ApiIdRequestInterceptor } from './api-id-request-interceptor';
import { AuthOriginInterceptor } from './auth-origin-interceptor';

export const HttpInterceptorProviders = [{
	provide: HTTP_INTERCEPTORS,
	useClass: ApiIdRequestInterceptor,
	multi: true
},{
	provide: HTTP_INTERCEPTORS,
	useClass: ApiAuthInterceptor,
	multi: true
},{
	provide: HTTP_INTERCEPTORS,
	useClass: ApiOriginInterceptor,
	multi: true
},{
	provide: HTTP_INTERCEPTORS,
	useClass: AuthOriginInterceptor,
	multi: true
}];
