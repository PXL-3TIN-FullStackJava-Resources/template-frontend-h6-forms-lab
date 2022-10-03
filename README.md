# H6 Forms
In deze lab voorzien we beide implementaties van formulieren binnen angular. Hierin gebruiken we daarnaast ook de validators & bekijken we de afhandeling van formulieren.

Gegeven is deze repo. Hierin staat een Angular project met reeds een login en register component. In beide is boilerplate code voor een formulier aanwezig die we in deze lab uitbreiden. Er wordt in deze lab ook gebruik bemaakt van een zelf geschreven modal dialog voor het register formulier. In een later hoofdstuk maken we gebruik van bv. Angular Material om dit voor ons af te handelen.

**Navigeer naar deze folder via de CLI** en voer volgend commando uit: ```npm install```
 
Vervolgens voer je, nog steeds in deze folder, het commando ```ng serve -o``` uit. Hiermee zal de applicatie gestart worden en gaat er automatisch een browser open. Moest dit laatste niet het geval zijn, surf je naar http://localhost:4200. Bij elke aanpassing in de code zal de browser automatisch refreshen.

![alt_text](https://i.imgur.com/TT9FcyW.png "image_tooltip") Bekijk de code van het project. Zoom zeker in op de werking van het tonen van het registratieformulier. Dit is een goede herhaling voor het werken met events / eventemitters.

## Template driven form
Voor het login formulier maken we gebruik van een template driven form. De meeste logica van het formulier wordt in de template gedefinieerd. Starten doen we echter in de component klasse. Voeg volgende properties toe aan ```login.component.ts```:
```typescript
  email: string = '';
  password: string ='';
```
Daarna voegen we meteen de `FormsModule` toe in de `imports` van de `app.module.ts` file:
```typescript
imports: [
    BrowserModule,
    FormsModule
  ],
```
Vervolgens passen we de view van de login-component aan. We voorzien 2 way input binding via de `[(ngModel)]` syntax voor beide form controls in `login.component.html`. Hierbij is het ook belangrijk dat we het `name` attribuut een waarde geven:
```html
<input type="email" class="form-control" placeholder="Email address" name="email" [(ngModel)]="email">
<input type="password" class="form-control" placeholder="Password" name="password" [(ngModel)]="password">
```
Doordat we de formsmodule importeren gaat Angular automatisch een `ngForm` object linken aan elke form tag in je applicatie. We kunnen deze raadplegen via een template reference variabele. Pas de `login.component.html`aan als volgt:
```html
<form class="form-signin" #loginForm="ngForm">
```
Dit is ook waarom we een `name` attribuut moeten geven aan elke input in een formulier. Angular gebruikt dit attribuut om het te linken aan het `ngForm` object.

### Afhandeling formulier
Om de waardes uit het formulier op te halen, maken we gebruik van een event `ngSubmit`. Angular gebruikt niet de default formulierafhandeling met `post` en `get` requests zoals je die kent uit andere omgevingen. Pas het formulier in `login.component.html` aan als volgt:
```html
<form class="form-signin" #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">
```
De `onSubmit(arg)` methode bestaat nog niet, dus deze maken we ook meteen aan in de `login.component.ts` file:
```typescript
  onSubmit(form: any): void{
    console.log(form.value);
    alert(form.value.email + ' - ' + form.value.password);
  }
```

### Validatie
Validatieregels kunnen we eenvoudig voorzien in de template van de component. Pas de inputvelden in de `login.component.html` aan als volgt:
```html
<input type="email" class="form-control" placeholder="Email address" name="email" [(ngModel)]="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$">
<input type="password" class="form-control" placeholder="Password" name="password" [(ngModel)]="password" required minlength="8">
```
Het email veld is nu verplicht in te vullen volgens een patroon. Het wachtwoord is verplicht en moet minimaal 8 karakters lang zijn. Bij het testen zal je merken dat het formulier evenzeer gesubmit kan worden zonder dat de validatie voldaan is. We passen daarom de submit knop aan als volgt:
```html
<button class="btn btn-success btn-block" type="submit" [disabled]="!loginForm.valid">Sign in</button>
```

Momenteel is er nog wel geen visuele indicatie of de validatie voldaan is op de knop na. Dit is nog geen goede UX.

### CSS klasses
Angular voorziet zelf een deel css klasses die toegevoegd worden aan input velden & forms:
| State	| Class if true |	Class if false |
|-------|--------------|----------------|
| The control has been visited. |	ng-touched |	ng-untouched |
| The control's value has changed. |	ng-dirty |	ng-pristine |
| The control's value is valid. |	ng-valid |	ng-invalid |

Deze kunnen we eenvoudig gebruiken door ze te definiëren in de `login.component.css` file. Voorzie hier volgende css regels:
```css
.ng-valid:not(form)  {
  border-left: 5px solid #42A948; /* green */
}

.ng-invalid:not(form)  {
  border-left: 5px solid #a94442; /* red */
}
```
### Custom validatie messages
Bovenstaande geeft al een beeld welke velden niet in orde zijn, maar we willen ook graag gebruik maken van custom error messages. Om voor elk inputveld aangepaste foutmeldingen te tonen, moeten we opnieuw referentie variabelen toevoegen aan de input velden:
```html
<input type="email" class="form-control" placeholder="Email address"
      name="email" [(ngModel)]="email" #emailRef="ngModel"
      required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$">
<input type="password" class="form-control" placeholder="Password"
      name="password" [(ngModel)]="password" #passwordRef="ngModel"
      required minlength="8">
``` 
Let wel: de naam van de referentievariabele mag niet dezelfde zijn als die van de property in de `[(ngModel)]` binding.

We kunnen deze referentievariabele nu gebruiken om custom error messages te tonen. Voorzie volgende code onder het input veld van de email:
```html
<small *ngIf="emailRef.errors?.required && emailRef.touched">email is required!</small>
<small *ngIf="emailRef.errors?.pattern && emailRef.touched">email format is incorrect!</small>
```
Voorzie daarna onderstade code onder het input veld van het password:
```html
<small *ngIf="passwordRef.errors?.required && emailRef.touched">password is required!</small>
      <small *ngIf="passwordRef.errors?.minlength && emailRef.touched">password must be 8 characters or longer!</small>
```
Tenslotte voorzien we volgende css blok in `login.component.css`: 
```css
small{
  display: block;
  color: #a94442;
  font-style: italic;
  font-size: 0.8rem;
}
```
![alt_text](https://i.imgur.com/TT9FcyW.png "image_tooltip") Test de applicatie uitbundig en bekijk in detail de werking van de geschreven code.

![alt_text](https://i.imgur.com/TT9FcyW.png "image_tooltip") Recap? Vertrek vanuit de confessions lab en pas het formulier aan zodat je hier op een juiste manier gebruik maakt van een template driven form. Voorzie ook de nodige validatie regels & messages.

## Reactive form
Voor het registratie formulier maken we gebruik van een reactive form (=model driven). De meeste logica van het formulier wordt in de component klasse gedefinieerd. Voor we gebruik kunnen maken van een reactive form, voorzien we de `ReactiveFormsModule` import in de `app.module.ts` file:
```typescript
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
```
Vervolgens starten we met de declaratie van het formulier in de `register.component.ts` file. Maak hierin volgende property aan:

```typescript
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
```
In de `ngOnInit` methode voorzien we dan de initialisatie van het formulier met de verschillende formcontrols en hun (default) value en typings:
```typescript
 ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl<String>(''),
      firstName: new FormControl<String>(''),
      lastName: new FormControl<String>(''),
      email: new FormControl<String>(''),
      age: new FormControl<Number|null>(null),
      subscription: new FormControl<String>('')
    });
 }
```
De `FormGroup` en `FormControl` properties kunnen we vervolgens binden aan het formulier in de `register.component.html` file. We starten met de `FormGroup`:
```html
<form [formGroup]="registerForm">
```
Vervolgens voorzien we bij elk inputveld het nodige `formControlName` attribuut. De naam hiervan komt overeen met de naam in de eerder gemaakte `formGroup`:
```html
<div class="form-group">
    <label for="username">Username</label>
    <input type="text" class="form-control" id="username" placeholder="Enter Username"  formControlName="username">
  </div>
  <div class="form-group">
    <label for="firstName">First name</label>
    <input type="text" class="form-control" id="firstName" placeholder="Enter first name" formControlName="firstName">
  </div>
  <div class="form-group">
    <label for="lastName">Last name</label>
    <input type="text" class="form-control" id="lastName" placeholder="Enter last name" formControlName="lastName">
  </div>
  <div class="form-group">
    <label for="email">Email address</label>
    <input type="email" class="form-control" id="email" placeholder="Enter email" formControlName="email">
  </div>
  <div class="form-group">
    <label for="age">Age</label>
    <input type="number" class="form-control" id="age" placeholder="Enter age" formControlName="age">
  </div>
  <div class="form-group">
    <label for="subscription">Subscription</label>
    <select class="form-control" id="subscription" formControlName="subscription">
      <option value=""></option>
      <option value="free">Free tier</option>
      <option value="premium">Premium plan</option>
    </select>
  </div>
```
Hierna koppelen we de `ngSubmit` event aan onze custom methode om de data op te vangen:
```html
<form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
```
Tenslotte maken we de `onSubmit()` methode aan in de `register.component.ts` waarin we de waardes van het formulier in loggen:
```typescript
  onSubmit(): void{
    console.log(this.registerForm.value);
  }
```
Het formulier is nu klaar voor gebruik. Zoals te zien zijn de values rechtstreeks beschikbaar in de component klasse en moeten we geen data meer doorgeven vanuit de template view. 

### Validatie
Ook validatie toevoegen doen we in eerste instantie in de component klasse. Pas de `FormGroup` in `register.component.ts` aan als volgt om validatie toe te voegen:
```typescript
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl<String>('', [Validators.required,Validators.minLength(3)]),
      firstName: new FormControl<String>('', [Validators.required]),
      lastName: new FormControl<String>('', [Validators.required]),
      email: new FormControl<String>('', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      age: new FormControl<Number|null>(null, [Validators.required]),
      subscription: new FormControl<String>('', [Validators.required])
    });
  }

  get registerFormControls() {
    return this.registerForm.controls;
  }
```
De validators zijn het 2de argument binnen de constructor van de FormControl. Dit is een array, dus het koppelen van meerdere validators (& custom validators) is perfect mogelijk. Daarnaast hebben we ook een getter aangemaakt die de `FormControl` objecten uit de `FormGroup` teruggeeft. Deze getter gebruiken we later voor custom validatie berichten te tonen.

De validatieregels worden nu bijgehouden in het `FormGroup` object, maar verder heeft dit nog geen invloed op onze applicatie. We starten met het linken van de validatieregels aan de `disabled` property van de knop in `register.component.html`:
```html
<button type="submit" class="btn btn-primary formsubmit" [disabled]="!registerForm.valid">Submit</button>
```
Daarna voorzien we de custom error messages voor elk input veld. Hierbij gebruiken we de getter `registerFormControls` om vervolgens te controleren of er errors aanwezig zijn. Kopieer uit onderstaande codeblok de foutmeldingen en plaats ze onder het bijhorende input element:
```html
<small *ngIf="registerFormControls.username.errors?.required && registerFormControls.username.touched">username is required!</small>
<small *ngIf="registerFormControls.username.errors?.minlength && registerFormControls.username.touched">username must be at least 3 characters!</small>

<small *ngIf="registerFormControls.firstName.errors?.required && registerFormControls.firstName.touched">First name is required!</small>

<small *ngIf="registerFormControls.lastName.errors?.required && registerFormControls.lastName.touched">Last name is required!</small>

<small *ngIf="registerFormControls.email.errors?.required && registerFormControls.email.touched">Email is required!</small>
<small *ngIf="registerFormControls.email.errors?.pattern && registerFormControls.email.touched">Wrong email format!</small>

<small *ngIf="registerFormControls.age.errors?.required && registerFormControls.age.touched">Age is required!</small>

<small *ngIf="registerFormControls.subscription.errors?.required && registerFormControls.subscription.touched">Subscription is required!</small>
```

![alt_text](https://i.imgur.com/TT9FcyW.png "image_tooltip") Test de applicatie uitbundig en bekijk in detail de werking van de geschreven code. Je kan eventueel de CSS klasses uit de template driven form lab kopieren om hier hetzelfde visuele effect te creëren.

![alt_text](https://i.imgur.com/TT9FcyW.png "image_tooltip") Recap? Vertrek vanuit de confessions lab en pas het formulier aan zodat je hier op een juiste manier gebruik maakt van een reactive form. Voorzie ook de nodige validatie regels & messages.
