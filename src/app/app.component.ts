import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin-app';
  private linktTheme = document.querySelector('.dark');// se comunica el id pulsado

  ngOninit(){
    setTimeout(()=>{
      this.iniciarDarkMode();
    }, 500)
  }

  iniciarDarkMode(){
    let body = document.querySelector('body');
    let header = document.querySelector('header');
    let aside = document.querySelector('aside');

    let classExists = document.getElementsByClassName(
      'dark'
     ).length > 0;


    if (classExists) {
      const urlTheme = localStorage.getItem('dark');
      this.linktTheme?.setAttribute('class', urlTheme);
      body.classList.toggle('dark');
        header.classList.toggle('dark');
        aside.classList.toggle('dark');
      console.log('✅ class exists on page');
    } else {
      if(localStorage.getItem('dark') != null){
        const urlTheme = localStorage.getItem('dark');
        this.linktTheme?.setAttribute('class', urlTheme);
        body.classList.add('dark');
          header.classList.add('dark');
          aside.classList.add('dark');
      }
      console.log('⛔️ class does NOT exist on page');
    }
  }
}
