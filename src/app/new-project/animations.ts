import {animate, group, state, style, transition, trigger} from "@angular/animations";
/**
 * Created by hawkpro16 on 05/04/2017.
 */


export const buttonStateTrigger = trigger('buttonState', [
  state('valid', style({
    backgroundColor: 'lightgreen',
    borderColor: 'green',
    color: 'green',
  })),
  state('invalid', style({
    backgroundColor: 'red',
    color: 'white',
    borderColor: 'darkred'
  })),
  transition('invalid => valid', [
    group([
      animate(100, style({
        transform: 'scale(1.1)'
      })),
      animate(200, style({
        backgroundColor: 'green'
      })),
      animate(200, style({
        transform: 'scale(1)'
      }))
    ])
  ]),
  transition('valid => invalid', [
    group([
      animate(100, style({
        transform: 'scale(1.1)'
      })),
      animate(200, style({
        backgroundColor: 'red'
      })),
      animate(200, style({
        transform: 'scale(1)'
      }))
    ])
  ])

]);
