import { Component } from '@angular/core';

interface ManuItem {
  title: string;
  route: string;
}


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent {
  public reactiveMenu:ManuItem[]=[
    {
      title:'Básicos',
      route: '/reactive/basic'

    },{
      title:'Dinámicos',
      route: '/reactive/dynamic'

    },{
      title:'Switches',
      route: '/reactive/switches'

    }
  ]
  public authMenu:ManuItem[]=[
    {
      title:'Registro',
      route: '/auth'

    }
  ]

}
