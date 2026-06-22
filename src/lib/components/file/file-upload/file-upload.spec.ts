import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiFileUploadComponent } from './file-upload.component';

function makeFile(name: string, type: string, size = 1024): File {
  return new File(['x'.repeat(size)], name, { type });
}

describe('UiFileUploadComponent', () => {
  let fixture: ComponentFixture<UiFileUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [UiFileUploadComponent] });
    fixture = TestBed.createComponent(UiFileUploadComponent);
  });

  it('renders', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('starts with no files', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.files()).toEqual([]);
    expect(fixture.componentInstance.hasFiles()).toBe(false);
  });

  it('displays the chooseLabel', () => {
    fixture.componentRef.setInput('chooseLabel', 'Select Files');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Select Files');
  });

  it('formatSize returns "0 B" for zero bytes', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.formatSize(0)).toBe('0 B');
  });

  it('formatSize returns KB for sizes over 1024 bytes', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.formatSize(2048)).toBe('2 KB');
  });

  it('formatSize returns MB for sizes over 1 MB', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.formatSize(1048576)).toBe('1 MB');
  });

  it('does not open file dialog when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    // openFileDialog is a no-op when disabled; just verify it does not throw
    expect(() => fixture.componentInstance.openFileDialog()).not.toThrow();
  });

  it('applies drag-over classes when isDragOver is true', () => {
    fixture.detectChanges();
    fixture.componentInstance.isDragOver.set(true);
    fixture.detectChanges();
    expect(fixture.componentInstance.dropzoneClasses()).toContain('border-primary');
  });

  it('applies disabled classes when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(fixture.componentInstance.dropzoneClasses()).toContain('cursor-not-allowed');
    expect(fixture.componentInstance.dropzoneClasses()).toContain('opacity-60');
  });

  it('clears all files on clear()', () => {
    fixture.detectChanges();
    // Manually add a mock file to the signal
    fixture.componentInstance.files.set([
      {
        file: makeFile('test.txt', 'text/plain'),
        id: 'test-1',
        name: 'test.txt',
        size: 1024,
        type: 'text/plain',
        status: 'pending',
        progress: 0,
      },
    ]);
    fixture.detectChanges();
    expect(fixture.componentInstance.hasFiles()).toBe(true);

    fixture.componentInstance.clear();
    expect(fixture.componentInstance.files()).toEqual([]);
  });

  it('emits onClear when clear() is called', () => {
    fixture.detectChanges();
    const spy = jasmine.createSpy('onClear');
    fixture.componentInstance.onClear.subscribe(spy);
    fixture.componentInstance.clear();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('getFileIcon returns imageIcon for image type', () => {
    fixture.detectChanges();
    const uploadFile = {
      file: makeFile('photo.png', 'image/png'),
      id: 'img-1',
      name: 'photo.png',
      size: 1024,
      type: 'image/png',
      status: 'pending' as const,
      progress: 0,
    };
    expect(fixture.componentInstance.getFileIcon(uploadFile)).toBe(fixture.componentInstance.imageIcon);
  });

  it('getFileIcon returns fileIcon for unknown type', () => {
    fixture.detectChanges();
    const uploadFile = {
      file: makeFile('data.bin', 'application/octet-stream'),
      id: 'bin-1',
      name: 'data.bin',
      size: 512,
      type: 'application/octet-stream',
      status: 'pending' as const,
      progress: 0,
    };
    expect(fixture.componentInstance.getFileIcon(uploadFile)).toBe(fixture.componentInstance.fileIcon);
  });
});
