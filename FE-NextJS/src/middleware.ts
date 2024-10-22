import { NextRequest, NextResponse } from 'next/server';
import { HOME_URL } from './common/constants/urlConst';

export const middleware = (request: NextRequest) => {
  const forwarded = request.headers.get('x-forwarded-for');
  const clientIp = forwarded ? forwarded.split(',')[0] : request.ip;

  const currentUrl = new URL(request.url);

  let response = new NextResponse();

  if (currentUrl.pathname === '/') {
    response = NextResponse.redirect(new URL(HOME_URL, currentUrl));
  } else {
    response = NextResponse.next();
  }

  response.cookies.set('client-ip', clientIp ?? '');

  return response;
};
