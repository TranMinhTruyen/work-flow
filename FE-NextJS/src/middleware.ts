import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { HOME_URL } from './common/constants/urlConst';

export const middleware = async (request: NextRequest) => {
  const headersList = await headers();
  const cookieStore = await cookies();

  cookieStore.set('client-ip', headersList.get('x-forwarded-for') ?? '');

  const currentUrl = new URL(request.url);

  let response = new NextResponse();

  if (currentUrl.pathname === '/') {
    response = NextResponse.redirect(new URL(HOME_URL, currentUrl));
  } else {
    response = NextResponse.next();
  }

  return response;
};

export const config = {
  matcher: '/:path*',
};
