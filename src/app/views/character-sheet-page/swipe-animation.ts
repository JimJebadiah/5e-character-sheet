import { trigger, state, style, transition, animate } from '@angular/animations';

export const swipeAnimation = trigger('swipeAnimation', [
  state('void', style({ transform: 'translateX(150%)' })),
  transition(':enter', [
    animate('0.3s ease-out', style({ transform: 'translateX(0)' }))
  ]),
  transition(':leave', [
    animate('0.3s ease-out', style({ transform: 'translateX(-150%)' }))
  ])
]);
