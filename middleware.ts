import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 如果在该函数中使用 "await"，则可将其标记为 "async"。
export async function middleware(request: NextRequest) {
  const { isAuthenticated } = getKindeServerSession();
  // 如果用户未经身份验证，请将其重定向到登录页面。
  if (!(await isAuthenticated())) {
    return NextResponse.redirect(
      new URL('/api/auth/login?post_login_redirect_url=/dashboard', request.url)
    );
  }
}

// 请参阅下面的“匹配路径”以了解更多信息
export const config = {
  matcher: ['/dashboard']
};
