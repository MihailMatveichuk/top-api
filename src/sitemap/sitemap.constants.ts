import { TopLevelCategory } from 'top-page/top-page.model';

type routeMapType = Record<TopLevelCategory, string>;

export const CATEGORY_URL: routeMapType = {
  1: '/courses',
  2: '/services',
  3: '/books',
  0: '/products',
};
