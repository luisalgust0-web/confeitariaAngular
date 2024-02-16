import { Component, OnInit } from '@angular/core';
import { TemplateEmailService } from '../../service/template-email.service';

@Component({
  selector: 'app-template-email',
  templateUrl: './template-email.component.html',
  styleUrls: ['./template-email.component.scss']
})
export class TemplateEmailComponent implements OnInit {

  itens= [] as any[];

  constructor(private service:TemplateEmailService) { }

  ngOnInit(): void {
    this.service.getLista().subscribe((itens : any[]) =>{
      this.itens = itens;
    })
  }

}
