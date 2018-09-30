import { Component, Renderer2, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TimelineLite, SlowMo } from 'gsap';

declare const document: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  signupForm: FormGroup;
  prevBgClass = 'blue';
  step = 1;
  showErrorMsg: boolean;

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm = () => {
    this.signupForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      favoriteColor: 'yellow',
      favoriteNinjaTurtle: '',
      amazing: '',
    });

    this.changeBg();
  }

  changeBg = () => {
    const bgClass = this.signupForm.get('favoriteColor').value;
    this.renderer.removeClass(document.body, this.prevBgClass);
    this.renderer.addClass(document.body, bgClass);
    this.prevBgClass = bgClass;
  }

  tmntAnim = () => {
    const tmnt = this.signupForm.get('favoriteNinjaTurtle').value;
    const tmntImg = this.renderer.selectRootElement('#' + tmnt + '-img');
    this.renderer.setAttribute(tmntImg, 'style', 'opacity: 1;');

    const tl = new TimelineLite();
    tl.to(tmntImg, 2, {
      top: -1500,
      delay: 0.1,
      ease: SlowMo.ease.config(0.7, 1, false)
    }, .1);
  }

  processForm = () => {
    console.log(this.signupForm.value);
    if (this.signupForm.status === 'VALID') {
      this.showErrorMsg = false;
      this.step++;
    } else {
      this.showErrorMsg = true;
    }
  }

}
