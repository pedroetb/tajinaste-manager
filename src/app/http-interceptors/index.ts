import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiAuthInterceptor } from './api-auth-interceptor';
import { ApiHostInterceptor } from './api-host-interceptor';
import { ApiIdRequestInterceptor } from './api-id-request-interceptor';
import { AuthHostInterceptor } from './auth-host-interceptor';

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
	useClass: ApiHostInterceptor,
	multi: true
},{
	provide: HTTP_INTERCEPTORS,
	useClass: AuthHostInterceptor,
	multi: true
}];
