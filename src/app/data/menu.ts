import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  {
    label: 'nav.home',
    href: '/',
  },
  {
    label: 'nav.structure',
    href: '#',
    children: [
      { label: 'nav.about', href: '/about' },
      { label: 'nav.leadership', href: '/leadership' },
      { label: 'nav.teachers', href: '/teachers' },
      { label: 'nav.departments', href: '/departments' },
    ],
  },
  {
    label: 'nav.activity',
    href: '#',
    children: [
      { label: 'nav.subjects', href: '/subjects' },
      { label: 'nav.programs', href: '/programs' },
    ],
  },
  {
    label: 'nav.gallery',
    href: '#',
    children: [
      { label: 'nav.photos', href: '/gallery' },
      { label: 'nav.videos', href: '/videos' },
      { label: 'nav.infrastructure', href: '/infrastructure' },
    ],
  },
  {
    label: 'nav.education',
    href: '#',
    children: [
      { label: 'nav.schedule', href: '/schedule' },
      { label: 'nav.library', href: '/library' },
    ],
  },
  {
    label: 'nav.admission',
    href: '/admission',
  },
  {
    label: 'nav.contact',
    href: '/contact',
  },
];
