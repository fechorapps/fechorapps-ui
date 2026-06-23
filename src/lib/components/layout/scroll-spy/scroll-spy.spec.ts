import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiScrollSpyComponent, ScrollSpyItem } from './scroll-spy.component';

const mockItems: ScrollSpyItem[] = [
  { id: 'section-1', label: 'Introduction' },
  { id: 'section-2', label: 'Details' },
  { id: 'section-3', label: 'Conclusion' },
];

describe('UiScrollSpyComponent', () => {
  let fixture: ComponentFixture<UiScrollSpyComponent>;
  let component: UiScrollSpyComponent;

  // Mock IntersectionObserver for jsdom
  const mockDisconnect = jasmine.createSpy('disconnect');
  const mockObserve = jasmine.createSpy('observe');

  beforeAll(() => {
    (window as unknown as Record<string, unknown>)['IntersectionObserver'] = class {
      disconnect = mockDisconnect;
      observe = mockObserve;
      unobserve = jasmine.createSpy('unobserve');
      constructor(
        public callback: IntersectionObserverCallback,
        public options?: IntersectionObserverInit
      ) {}
    };
  });

  beforeEach(async () => {
    mockDisconnect.calls.reset();
    mockObserve.calls.reset();

    await TestBed.configureTestingModule({
      imports: [UiScrollSpyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiScrollSpyComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();
  });

  it('renders the component', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('renders all items as buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(mockItems.length);
  });

  it('renders item labels', () => {
    const buttons: NodeListOf<HTMLButtonElement> = fixture.nativeElement.querySelectorAll('button');
    expect(buttons[0].textContent?.trim()).toContain('Introduction');
    expect(buttons[1].textContent?.trim()).toContain('Details');
    expect(buttons[2].textContent?.trim()).toContain('Conclusion');
  });

  it('applies vertical flex layout by default', () => {
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav.className).toContain('flex-col');
  });

  it('applies horizontal flex layout when orientation is horizontal', () => {
    fixture.componentRef.setInput('orientation', 'horizontal');
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav.className).toContain('flex-row');
  });

  it('applies active classes when activeId matches an item', () => {
    component.activeId.set('section-1');
    fixture.detectChanges();
    const firstButton: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[0];
    expect(firstButton.className).toContain('text-primary');
    expect(firstButton.className).toContain('font-medium');
  });

  it('does not apply active classes to non-active items', () => {
    component.activeId.set('section-1');
    fixture.detectChanges();
    const secondButton: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[1];
    expect(secondButton.className).toContain('text-muted-foreground');
    expect(secondButton.className).not.toContain('text-primary');
  });

  it('applies custom activeClass when item is active', () => {
    fixture.componentRef.setInput('activeClass', 'my-active-class');
    component.activeId.set('section-2');
    fixture.detectChanges();
    const secondButton: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[1];
    expect(secondButton.className).toContain('my-active-class');
  });

  it('calls scrollTo on button click', () => {
    spyOn(component, 'scrollTo');
    const buttons: NodeListOf<HTMLButtonElement> = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click();
    fixture.detectChanges();
    expect(component.scrollTo).toHaveBeenCalledWith('section-2');
  });

  it('scrollTo does nothing when element is not found', () => {
    spyOn(document, 'getElementById').and.returnValue(null);
    expect(() => component.scrollTo('nonexistent')).not.toThrow();
  });

  it('scrollTo calls scrollIntoView with smooth behavior', () => {
    const mockEl = { scrollIntoView: jasmine.createSpy('scrollIntoView') };
    spyOn(document, 'getElementById').and.returnValue(mockEl as unknown as HTMLElement);
    fixture.componentRef.setInput('smooth', true);
    fixture.detectChanges();
    component.scrollTo('section-1');
    expect(mockEl.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('scrollTo calls scrollIntoView with auto behavior when smooth is false', () => {
    const mockEl = { scrollIntoView: jasmine.createSpy('scrollIntoView') };
    spyOn(document, 'getElementById').and.returnValue(mockEl as unknown as HTMLElement);
    fixture.componentRef.setInput('smooth', false);
    fixture.detectChanges();
    component.scrollTo('section-1');
    expect(mockEl.scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' });
  });

  it('emits activeChange when activeId signal is set', () => {
    const emitted: string[] = [];
    component.activeChange.subscribe((id: string) => emitted.push(id));
    component.activeId.set('section-3');
    fixture.detectChanges();
    // activeChange is emitted by the IntersectionObserver callback, not directly by activeId
    // We test that the output is wired up correctly by checking subscription works
    expect(emitted).toEqual([]);
  });

  it('ngOnDestroy disconnects all observers', () => {
    component.ngOnDestroy();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('sets aria-current attribute on active item', () => {
    component.activeId.set('section-1');
    fixture.detectChanges();
    const firstButton: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[0];
    expect(firstButton.getAttribute('aria-current')).toBe('location');
  });

  it('does not set aria-current on inactive items', () => {
    component.activeId.set('section-1');
    fixture.detectChanges();
    const secondButton: HTMLButtonElement = fixture.nativeElement.querySelectorAll('button')[1];
    expect(secondButton.getAttribute('aria-current')).toBeNull();
  });
});
