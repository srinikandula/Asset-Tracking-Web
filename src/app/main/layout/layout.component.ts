import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {ApiServiceService} from '../../services/api-service.service';
import {ApiUrls} from '../../schemas/apiUrls';

declare var jQuery: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public currentUser: any = {};
  public userDetails: any = {};
  public role: any;
  public changMenu: boolean = false;
  public headerRole: boolean = false;
  public adminRole: boolean = false;
  // main menu
  public assetTrackingMenu: boolean = false;
  // sub menu
  public assetRequisitionFormMenu: boolean = false;
  public assetMenu: boolean = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private apiServiceService: ApiServiceService,
              private apiUrls: ApiUrls) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    });
  }

  // @ts-ignore
  getUserRoleValue(key: any): string {
    if (key) {
      return this.apiServiceService.getUserRoleValue(key);
    }
  }

  logOutUser(): void {
    this.authenticationService.logOut();
    window.location.reload();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    (($) => {
      $(document).ready( () => {
        const treeviewMenu = $('.app-menu');
        const treeviewMenuChild = $('.app-menu-child');
        // Toggle Sidebar
        // tslint:disable-next-line:only-arrow-functions typedef
        // @ts-ignore
        $('[data-toggle="sidebar"]').click(function(event) {
          event.preventDefault();
          $('.app').toggleClass('sidenav-toggled');
        });

        // Activate sidebar treeview toggle
        // @ts-ignore
        $('[data-toggle=\'treeview\']').click(function(event) {
          event.preventDefault();
          // @ts-ignore
          if (!$(this).parent().hasClass('is-expanded')) {
            treeviewMenu.find('[data-toggle=\'treeview\']').parent().removeClass('is-expanded');
          }
          // @ts-ignore
          $(this).parent().toggleClass('is-expanded');
        });

        // @ts-ignore
        $('[data-toggle=\'treeview-child\']').click(function(event) {
          event.preventDefault();
          // @ts-ignore
          if (!$(this).parent().hasClass('is-expanded')) {
            treeviewMenuChild.find('[data-toggle=\'treeview-child\']').parent().removeClass('is-expanded');
          }
          // @ts-ignore
          $(this).parent().toggleClass('is-expanded');
        });

        // Set initial active toggle
        $('[data-toggle=\'treeview.\'].is-expanded').parent().toggleClass('is-expanded');

        $('[data-toggle=\'treeview-child.\'].is-expanded').parent().toggleClass('is-expanded');

        $('[data-toggle=\'tooltip\']').tooltip();

        $('[data-toggle="popover"]').popover();

      });
    })(jQuery);
    this.getLoggedInUserDetails();
  }

  getLoggedInUserDetails(): void{
    this.apiServiceService.get(this.apiUrls.getLoggedInUser).subscribe((res: any) => {
      this.userDetails = res;
      this.role = parseInt(this.currentUser.role);
      this.changMenu = false;
      this.headerRole = true;
      this.adminRole = true;

      // Asset Tracking Menu
      this.assetTrackingMenu = true
      this.assetRequisitionFormMenu = true;
      this.assetMenu = true;

      if (this.role === 45 && this.userDetails.id === '5cefdbb380d01034b0c3ff2a') {
        this.assetRequisitionFormMenu = true;
        this.assetMenu = true;
      } else if (this.role === 72 || this.role === 70){
        this.assetRequisitionFormMenu = true;
        this.assetMenu = false;
      }else if (this.role === 78 || this.role === 80){
        this.assetRequisitionFormMenu = true;
        this.assetMenu = false;
      } else if (this.role === 74 ){
        this.assetRequisitionFormMenu = true;
        this.assetMenu = true;
      } else if (this.role === 26){
        this.assetRequisitionFormMenu = true;
        this.assetMenu = false;
      } else if (this.role === 27) {
        this.assetRequisitionFormMenu = false;
        this.assetMenu = true;
      } else if (this.role === 29) {
        this.assetRequisitionFormMenu = false;
        this.assetMenu = true;
      } else if (this.role === 31) {
        this.assetRequisitionFormMenu = true;
        this.assetMenu = false;
      } else if (this.role === 40) {
        this.assetRequisitionFormMenu = true;
        this.assetMenu = false;
      } else if (this.role === 76) {
        this.assetRequisitionFormMenu = true;
        this.assetMenu = false;
      } else {
        this.adminRole = false;
        this.headerRole = false;
      }
    });
  }

  gotoUserProfile(): void {
    this.router.navigate(['users/userProfile', {userId: this.userDetails.id, status: 'Status'}]);
  }
}
