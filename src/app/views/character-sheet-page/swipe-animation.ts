import { trigger, state, style, transition, animate } from "@angular/animations";

export const swipeAnimation = trigger('swipeAnimation', [
  state('void', style({ transform: 'translateX(-100%)' })),
  transition(':enter', [
    animate('0.5s ease-out', style({ transform: 'translateX(0)' }))
  ]),
  transition(':leave', [
    animate('0.5s ease-out', style({ transform: 'translateX(-100%)' }))
  ])
]);