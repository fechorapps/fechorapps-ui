// Import from the SAME barrel path an external consumer would use, not a
// deep path — this is what makes the test catch a missing export.
import { UiDashboardGridComponent, UiWidgetDashboardComponent, UiWidgetTableComponent, WIDGET_REGISTRY } from '.';

describe('layout barrel exports', () => {
  it('exposes UiDashboardGridComponent', () => {
    expect(UiDashboardGridComponent).toBeDefined();
  });

  it('exposes the widget-dashboard family', () => {
    expect(UiWidgetDashboardComponent).toBeDefined();
    expect(UiWidgetTableComponent).toBeDefined();
    expect(WIDGET_REGISTRY).toBeDefined();
  });
});
