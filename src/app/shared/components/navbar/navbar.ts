import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  activeMenu: string | null = null;

  openMenu(menuId: string): void {
    this.activeMenu = menuId;
  }

  closeMenu(menuId: string): void {
    if (this.activeMenu === menuId) {
      this.activeMenu = null;
    }
  }

  handleFocusOut(event: FocusEvent, menuId: string): void {
    const currentTarget = event.currentTarget as HTMLElement | null;
    const relatedTarget = event.relatedTarget as HTMLElement | null;

    if (!currentTarget || (relatedTarget && currentTarget.contains(relatedTarget))) {
      return;
    }

    this.closeMenu(menuId);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.activeMenu = null;
  }
}