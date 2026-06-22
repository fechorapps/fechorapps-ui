import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiColorThemeSwitcherComponent, DEFAULT_PALETTES } from './color-theme-switcher.component';

describe('UiColorThemeSwitcherComponent', () => {
  let fixture: ComponentFixture<UiColorThemeSwitcherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiColorThemeSwitcherComponent] });
    fixture = TestBed.createComponent(UiColorThemeSwitcherComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('selectTheme updates currentTheme', () => {
    fixture.detectChanges();
    fixture.componentInstance.selectTheme({ name: 'Purple', color: '#8b5cf6' });
    expect(fixture.componentInstance.currentTheme()).toBe('Purple');
  });

  it('displays all themes as buttons', () => {
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(DEFAULT_PALETTES.length);
  });
});
