import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

type DocumentType = 'CC' | 'CE' | 'NIT' | 'PA';
type ShippingMethodId = 'standard' | 'express' | 'pickup';
type PaymentMethodId = 'card' | 'pse' | 'wallet';

interface CheckoutItem {
  readonly id: string;
  readonly name: string;
  readonly quantity: number;
  readonly price: number;
  readonly color?: string;
  readonly size?: string;
}

interface ShippingMethod {
  readonly id: ShippingMethodId;
  readonly label: string;
  readonly description: string;
  readonly eta: string;
  readonly cost: number;
  readonly badge?: string;
}

interface PaymentMethod {
  readonly id: PaymentMethodId;
  readonly label: string;
  readonly description: string;
  readonly helper: string;
  readonly badge?: string;
}

type ContactFormGroup = FormGroup<{
  email: FormControl<string>;
  phone: FormControl<string>;
}>;

type ShippingFormGroup = FormGroup<{
  fullName: FormControl<string>;
  documentType: FormControl<DocumentType>;
  documentNumber: FormControl<string>;
  address: FormControl<string>;
  apartment: FormControl<string>;
  city: FormControl<string>;
  department: FormControl<string>;
  postalCode: FormControl<string>;
  notes: FormControl<string>;
}>;

type PaymentFormGroup = FormGroup<{
  cardHolder: FormControl<string>;
  cardNumber: FormControl<string>;
  expiry: FormControl<string>;
  cvv: FormControl<string>;
  saveCard: FormControl<boolean>;
}>;

type InvoiceFormGroup = FormGroup<{
  needInvoice: FormControl<boolean>;
  businessName: FormControl<string>;
  taxId: FormControl<string>;
  email: FormControl<string>;
}>;

type CheckoutFormGroup = FormGroup<{
  contact: ContactFormGroup;
  shipping: ShippingFormGroup;
  shippingMethod: FormControl<ShippingMethodId>;
  paymentMethod: FormControl<PaymentMethodId>;
  payment: PaymentFormGroup;
  invoice: InvoiceFormGroup;
  discountCode: FormControl<string>;
  acceptTerms: FormControl<boolean>;
}>;

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, CurrencyPipe],
  templateUrl: './checkout-form.html'
})
export class CheckoutFormComponent {
  private readonly phonePattern = /^[0-9]{7,10}$/;
  private readonly cardNumberPattern = /^[0-9]{13,19}$/;
  private readonly expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
  private readonly cvvPattern = /^[0-9]{3,4}$/;
  private readonly taxRate = 0.19;
  private readonly invoiceBusinessValidators = [Validators.required, Validators.minLength(3)];
  private readonly invoiceTaxValidators = [Validators.required, Validators.minLength(5)];
  private readonly invoiceEmailValidators = [Validators.required, Validators.email];

  readonly documentTypes: ReadonlyArray<{ value: DocumentType; label: string }> = [
    { value: 'CC', label: 'Cédula de ciudadanía' },
    { value: 'CE', label: 'Cédula de extranjería' },
    { value: 'NIT', label: 'NIT' },
    { value: 'PA', label: 'Pasaporte' }
  ];

  readonly departmentOptions: ReadonlyArray<string> = [
    'Cundinamarca',
    'Antioquia',
    'Valle del Cauca',
    'Atlántico',
    'Santander',
    'Bolívar'
  ];

  readonly cityOptions: ReadonlyArray<string> = [
    'Bogotá',
    'Medellín',
    'Cali',
    'Barranquilla',
    'Bucaramanga',
    'Cartagena'
  ];

  readonly shippingMethods: ReadonlyArray<ShippingMethod> = [
    {
      id: 'standard',
      label: 'Envío estándar',
      description: 'Ideal para compras planificadas. Operamos con aliados logísticos nacionales.',
      eta: 'Entrega estimada en 3 a 5 días hábiles',
      cost: 7.9
    },
    {
      id: 'express',
      label: 'Envío express',
      description: 'Recibe prioridad en despacho y seguimiento en tiempo real.',
      eta: 'Entrega estimada en 24 a 48 horas',
      cost: 14.5,
      badge: 'Recomendado'
    },
    {
      id: 'pickup',
      label: 'Recoger en tienda Dulce',
      description: 'Disponible en nuestras principales tiendas. Te avisaremos cuando esté listo.',
      eta: 'Retiro disponible en 2 a 3 días hábiles',
      cost: 0,
      badge: 'Sin costo'
    }
  ];

  readonly paymentMethods: ReadonlyArray<PaymentMethod> = [
    {
      id: 'card',
      label: 'Tarjeta de crédito o débito',
      description: 'Visa, Mastercard, American Express y débito nacional.',
      helper: 'Pago inmediato con validación 3D Secure',
      badge: 'Más usado'
    },
    {
      id: 'pse',
      label: 'Transferencia segura (PSE)',
      description: 'Conecta con tu banco sin salir del checkout.',
      helper: 'Serás redirigido a la pasarela bancaria'
    },
    {
      id: 'wallet',
      label: 'Billeteras digitales',
      description: 'Nequi, Daviplata y otras billeteras autorizadas.',
      helper: 'Confirmación en tiempo real'
    }
  ];

  readonly orderItems: ReadonlyArray<CheckoutItem> = [
    {
      id: 'satin-top',
      name: 'Top satinado lavanda',
      quantity: 1,
      price: 48,
      color: 'Lavanda',
      size: 'M'
    },
    {
      id: 'wide-leg',
      name: 'Pantalón wide leg arena',
      quantity: 1,
      price: 62,
      color: 'Arena cálido',
      size: '6'
    }
  ];

  readonly checkoutForm: CheckoutFormGroup;
  readonly contact: ContactFormGroup;
  readonly shipping: ShippingFormGroup;
  readonly payment: PaymentFormGroup;
  readonly invoice: InvoiceFormGroup;

  appliedDiscount = 0;
  discountLabel = '';
  discountFeedback: { type: 'success' | 'error'; message: string } | null = null;
  isSubmitting = false;
  submissionState: 'idle' | 'success' | 'error' = 'idle';

  constructor(private readonly fb: FormBuilder, private readonly destroyRef: DestroyRef) {
    this.contact = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]]
    }) as ContactFormGroup;

    this.shipping = this.fb.nonNullable.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      documentType: ['CC' as DocumentType, Validators.required],
      documentNumber: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      apartment: [''],
      city: ['', Validators.required],
      department: ['', Validators.required],
      postalCode: ['', Validators.required],
      notes: ['']
    }) as ShippingFormGroup;

    this.payment = this.fb.nonNullable.group({
      cardHolder: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(this.cardNumberPattern)]],
      expiry: ['', [Validators.required, Validators.pattern(this.expiryPattern)]],
      cvv: ['', [Validators.required, Validators.pattern(this.cvvPattern)]],
      saveCard: [true]
    }) as PaymentFormGroup;

    this.invoice = this.fb.nonNullable.group({
      needInvoice: [false],
      businessName: [''],
      taxId: [''],
      email: ['']
    }) as InvoiceFormGroup;

    this.checkoutForm = this.fb.nonNullable.group({
      contact: this.contact,
      shipping: this.shipping,
      shippingMethod: ['standard' as ShippingMethodId, Validators.required],
      paymentMethod: ['card' as PaymentMethodId, Validators.required],
      payment: this.payment,
      invoice: this.invoice,
      discountCode: [''],
      acceptTerms: [false, Validators.requiredTrue]
    }) as CheckoutFormGroup;

    this.invoice.controls.needInvoice.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => this.updateInvoiceValidators(value));

    this.checkoutForm.controls.paymentMethod.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(method => this.updatePaymentState(method));

    this.checkoutForm.controls.discountCode.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.discountFeedback?.type === 'error') {
          this.discountFeedback = null;
        }
      });
  }

  get selectedShippingMethod(): ShippingMethod | undefined {
    const methodId = this.checkoutForm.controls.shippingMethod.value;
    return this.shippingMethods.find(method => method.id === methodId);
  }

  get selectedPaymentMethod(): PaymentMethod | undefined {
    const methodId = this.checkoutForm.controls.paymentMethod.value;
    return this.paymentMethods.find(method => method.id === methodId);
  }

  get subtotal(): number {
    return this.roundCurrency(
      this.orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
    );
  }

  get discountAmount(): number {
    return this.roundCurrency(Math.max(this.subtotal * this.appliedDiscount, 0));
  }

  get taxable(): number {
    return this.roundCurrency(Math.max(this.subtotal - this.discountAmount, 0));
  }

  get taxes(): number {
    return this.roundCurrency(this.taxable * this.taxRate);
  }

  get shippingCost(): number {
    return this.roundCurrency(this.selectedShippingMethod?.cost ?? 0);
  }

  get total(): number {
    return this.roundCurrency(this.taxable + this.taxes + this.shippingCost);
  }

  get isCardSelected(): boolean {
    return this.checkoutForm.controls.paymentMethod.value === 'card';
  }

  applyDiscount(): void {
    const codeControl = this.checkoutForm.controls.discountCode;
    const code = codeControl.value.trim().toUpperCase();

    if (!code) {
      this.discountFeedback = { type: 'error', message: 'Ingresa un código válido.' };
      return;
    }

    if (code === 'DULCE10') {
      this.appliedDiscount = 0.1;
      this.discountLabel = 'DULCE10';
      this.discountFeedback = {
        type: 'success',
        message: '¡Listo! Aplicamos un 10% de descuento a tu pedido.'
      };
      codeControl.reset('', { emitEvent: false });
      return;
    }

    this.discountFeedback = {
      type: 'error',
      message: 'El código ingresado no es válido o ya fue utilizado.'
    };
  }

  clearDiscount(): void {
    this.appliedDiscount = 0;
    this.discountLabel = '';
    this.discountFeedback = null;
  }

  submitCheckout(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      this.submissionState = 'error';
      return;
    }

    this.isSubmitting = true;
    this.submissionState = 'idle';

    setTimeout(() => {
      this.isSubmitting = false;
      this.submissionState = 'success';
    }, 1200);
  }

  private updateInvoiceValidators(needInvoice: boolean): void {
    const { businessName, taxId, email } = this.invoice.controls;

    if (needInvoice) {
      businessName.addValidators(this.invoiceBusinessValidators);
      taxId.addValidators(this.invoiceTaxValidators);
      email.addValidators(this.invoiceEmailValidators);
    } else {
      businessName.removeValidators(this.invoiceBusinessValidators);
      taxId.removeValidators(this.invoiceTaxValidators);
      email.removeValidators(this.invoiceEmailValidators);
      businessName.reset('', { emitEvent: false });
      taxId.reset('', { emitEvent: false });
      email.reset('', { emitEvent: false });
    }

    businessName.updateValueAndValidity({ emitEvent: false });
    taxId.updateValueAndValidity({ emitEvent: false });
    email.updateValueAndValidity({ emitEvent: false });
  }

  private updatePaymentState(method: PaymentMethodId): void {
    if (method === 'card') {
      this.payment.enable({ emitEvent: false });
      if (!this.payment.controls.cardHolder.value) {
        this.payment.controls.saveCard.setValue(true, { emitEvent: false });
      }
      return;
    }

    this.payment.disable({ emitEvent: false });
    this.payment.patchValue(
      {
        cardHolder: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        saveCard: false
      },
      { emitEvent: false }
    );
  }

  private roundCurrency(value: number): number {
    return Math.round(value * 100) / 100;
  }
}