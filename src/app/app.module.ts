import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { TodoRootComponent } from './todo/todo-root/todo-root.component';
import { TodoNavComponent } from './todo/todo-nav/todo-nav.component';
import { TodoContentComponent } from './todo/todo-content/todo-content.component';
import { TodoService } from './todo/todo.service';
import { TodoDaoService } from './dao/todo-dao.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    MenuComponent,
    TodoRootComponent,
    TodoNavComponent,
    TodoContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    TodoDaoService,
    TodoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
