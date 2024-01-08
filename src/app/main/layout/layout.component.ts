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

  currentUser: any = {};
  public userDetails: any = {};

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
    // this.getLoggedInUserDetails();
  }

  // getLoggedInUserDetails(): void{
  //   this.apiServiceService.get(this.apiUrls.getLoggedInUser).subscribe((res: any) => {
  //     this.userDetails = res;
  //     this.role = parseInt(this.currentUser.role);
  //     this.changMenu = false;
  //     this.headerRole = true;
  //     this.adminRole = true;
  //     this.dashBoardMenu = true;
  //     this.DashBoardCountDisabled = false;
  //     // onBoardingMenu
  //     this.onBoardingMenu = true;
  //     this.searchUsersMenuOption = true;
  //     this.dashboardMenuOption = true;
  //     this.pendingUsersReportMenuOption = true;
  //     this.vehicleMasterMenuOption = true;
  //     this.fleetManagersMenuOption = true;
  //     this.beneficiariesMenuOption = true;
  //
  //     // operationsTrackingMenu
  //     this.operationsTrackingMenu = true;
  //     this.calendarShiftsMenuOption = true;
  //     this.userShiftsMenuOption = true;
  //     this.userAttendanceLogListMenuOption = true;
  //     this.tripsMenuOption = true;
  //
  //     // PayoutsMenu
  //     this.plansMenuOption = true;
  //     this.PayoutsMenu = true;
  //     this.advancePaymentMenuOption = true;
  //     this.finalPayoutMenuOption = true;
  //     this.paymentReportMenuOption = true;
  //     this.vouchersMenuOption = true;
  //     this.userPlansMenuOption = true;
  //     this.cashTransfersMenuOption = true;
  //     this.ReimbursementsMenuOption = true;
  //     this.eInvoiceMenuOption = true;
  //     this.creditNoteMenuOption = true;
  //     this.receivablesMenuOption = true;
  //     this.vendorPaymentOption = true;
  //     this.cashClosureMenuOption = true;
  //
  //     // payslipsMenu
  //     this.payslipsMenu = true;
  //     this.paySlipFileUploadsMenuOption = true;
  //     this.invoiceFleetMenuOption = true;
  //     this.invoiceICStaffMenuOption = true;
  //
  //     // setupMenu
  //     this.setupMenu = true;
  //     this.clientsMenuOption = true;
  //     this.citiesMenuOption = true;
  //     this.sitesMenuOption = true;
  //     this.clientUserIdsMenuOption = true;
  //     this.plansMenuOption = true;
  //     this.billingPlansMenuOption = true;
  //     this.newShiftTemplateMenuOption = true;
  //     this.templateConfigurationsMenuOption = true;
  //     this.autoShiftConfigurationsMenuOption = false;
  //     this.packageTypesMenuOption = true;
  //     this.updateShiftsMenuOption = true;
  //     this.userShiftAssignmentsMenuOption = true;
  //     this.houseKeepingStaffMenuOption = true;
  //
  //     //  machineLearningMenu
  //     this.machineLearningMenu = true;
  //     this.ZipCodeClusteringMenuOption = true;
  //     this.userMappingToZipCodesMenuOption = true;
  //
  //     // Orders Menu
  //     this.orderTrackingMenu = true;
  //     this.orderTrackingMenuOption = true;
  //     this.feedbackDashboardMenuOption = true;
  //
  //     // notificationsMenu
  //     this.notificationsMenu = true;
  //     this.sendNotificationMenuOption = true;
  //     this.viewNotificationsMenuOption = true;
  //     this.whatsAppConversationsMenuOption = true;
  //
  //     // settingMenu
  //     this.settingMenu = true;
  //     this.devicesMenuOption = true;
  //     this.businessUnitTypesMenuOption = true;
  //     this.siteTypeMenuOption = true;
  //     this.auditTrailListMenuOption = true;
  //     this.proxyLoginsMenuOption = true;
  //
  //     // reportMenu
  //     this.reportMenu = true;
  //     this.amazonDailyReportMenuOption = true;
  //     this.swiggyDistributionMenuOPtion = true;
  //     this.shiftPerformanceReportMenuOption = true;
  //     this.tripSummaryReportsMenuOption = true;
  //     this.referredListMenuOption = true;
  //     this.payoutDeductionsListMenuOption = true;
  //     this.userPlanDetailsListMenuOption = true;
  //     this.expenseReportsMenuOption = true;
  //     this.regionMenuOption = true;
  //
  //     // analyticsMenu
  //     this.analyticsMenu = true;
  //
  //     if (this.role === 45 ) {
  //       this.ZipCodeClusteringMenuOption = true;
  //       this.autoShiftConfigurationsMenuOption = true;
  //       this.creditNoteMenuOption = true;
  //       this.receivablesMenuOption = true;
  //       this.payoutDeductionsListMenuOption = true;
  //       this.cashTransfersMenuOption = true;
  //       this.userPlanDetailsListMenuOption = true;
  //       this.userMappingToZipCodesMenuOption = true;
  //       this.orderTrackingMenuOption = true;
  //       this.feedbackDashboardMenuOption = true;
  //       this.houseKeepingStaffMenuOption = true;
  //       this.cashClosureMenuOption = true;
  //       this.processingFeeOption = true;
  //       this.autoVerifiedTripMenuOptions = true;
  //       this.expenseReportsMenuOption = true;
  //       this.regionMenuOption = true;
  //       this.userAttendanceLogListMenuOption = true;
  //       this.auditTrailListMenuOption = true;
  //     } else if (this.role === 41) {
  //       this.ZipCodeClusteringMenuOption = true;
  //       this.autoShiftConfigurationsMenuOption = true;
  //       this.creditNoteMenuOption = true;
  //       this.receivablesMenuOption = true;
  //       this.payoutDeductionsListMenuOption = true;
  //       this.cashTransfersMenuOption = true;
  //       this.userPlanDetailsListMenuOption = false;
  //       this.userMappingToZipCodesMenuOption = true;
  //       this.orderTrackingMenuOption = true;
  //       this.houseKeepingStaffMenuOption = true;
  //       this.cashClosureMenuOption = true;
  //       this.processingFeeOption = true;
  //       this.autoVerifiedTripMenuOptions = false;
  //       this.expenseReportsMenuOption = true;
  //       this.regionMenuOption = true;
  //       this.userAttendanceLogListMenuOption = true;
  //       this.auditTrailListMenuOption = false;
  //     }else if (this.role === 43){
  //       this.ZipCodeClusteringMenuOption = true;
  //       this.autoShiftConfigurationsMenuOption = true;
  //       this.creditNoteMenuOption = true;
  //       this.receivablesMenuOption = true;
  //       this.payoutDeductionsListMenuOption = false;
  //       this.cashTransfersMenuOption = true;
  //       this.userPlanDetailsListMenuOption = false;
  //       this.userMappingToZipCodesMenuOption = true;
  //       this.orderTrackingMenuOption = true;
  //       this.houseKeepingStaffMenuOption = true;
  //       this.cashClosureMenuOption = true;
  //       this.processingFeeOption = true;
  //       this.autoVerifiedTripMenuOptions = true;
  //       this.expenseReportsMenuOption = true;
  //       this.regionMenuOption = true;
  //       this.userAttendanceLogListMenuOption = true;
  //       this.auditTrailListMenuOption = false;
  //     }else if (this.role === 78) {
  //       this.ZipCodeClusteringMenuOption = true;
  //       this.autoShiftConfigurationsMenuOption = true;
  //       this.creditNoteMenuOption = true;
  //       this.receivablesMenuOption = true;
  //       this.payoutDeductionsListMenuOption = false;
  //       this.cashTransfersMenuOption = true;
  //       this.userPlanDetailsListMenuOption = false;
  //       this.userMappingToZipCodesMenuOption = true;
  //       this.orderTrackingMenuOption = true;
  //       this.houseKeepingStaffMenuOption = true;
  //       this.cashClosureMenuOption = true;
  //       this.processingFeeOption = true;
  //       this.autoVerifiedTripMenuOptions = true;
  //       this.expenseReportsMenuOption = true;
  //       this.regionMenuOption = true;
  //       this.userAttendanceLogListMenuOption = true;
  //       this.auditTrailListMenuOption = false;
  //     }else if (this.role === 47){
  //       this.ZipCodeClusteringMenuOption = true;
  //       this.autoShiftConfigurationsMenuOption = true;
  //       this.creditNoteMenuOption = true;
  //       this.receivablesMenuOption = true;
  //       this.payoutDeductionsListMenuOption = false;
  //       this.cashTransfersMenuOption = true;
  //       this.userPlanDetailsListMenuOption = false;
  //       this.userMappingToZipCodesMenuOption = true;
  //       this.orderTrackingMenuOption = true;
  //       this.houseKeepingStaffMenuOption = true;
  //       this.cashClosureMenuOption = true;
  //       this.processingFeeOption = true;
  //       this.autoVerifiedTripMenuOptions = false;
  //       this.expenseReportsMenuOption = false;
  //       this.regionMenuOption = true;
  //       this.userAttendanceLogListMenuOption = true;
  //       this.auditTrailListMenuOption = false;
  //     }else if (this.role === 80){
  //       this.ZipCodeClusteringMenuOption = true;
  //       this.autoShiftConfigurationsMenuOption = true;
  //       this.creditNoteMenuOption = true;
  //       this.receivablesMenuOption = true;
  //       this.payoutDeductionsListMenuOption = false;
  //       this.cashTransfersMenuOption = true;
  //       this.userPlanDetailsListMenuOption = false;
  //       this.userMappingToZipCodesMenuOption = true;
  //       this.orderTrackingMenuOption = true;
  //       this.houseKeepingStaffMenuOption = true;
  //       this.cashClosureMenuOption = true;
  //       this.processingFeeOption = true;
  //       this.autoVerifiedTripMenuOptions = false;
  //       this.expenseReportsMenuOption = true;
  //       this.regionMenuOption = true;
  //       this.userAttendanceLogListMenuOption = true;
  //       this.auditTrailListMenuOption = false;
  //     }else if (this.role === 76){
  //       this.ZipCodeClusteringMenuOption = true;
  //       this.autoShiftConfigurationsMenuOption = true;
  //       this.creditNoteMenuOption = true;
  //       this.receivablesMenuOption = true;
  //       this.payoutDeductionsListMenuOption = true;
  //       this.cashTransfersMenuOption = true;
  //       this.userPlanDetailsListMenuOption = false;
  //       this.userMappingToZipCodesMenuOption = true;
  //       this.orderTrackingMenuOption = true;
  //       this.houseKeepingStaffMenuOption = true;
  //       this.cashClosureMenuOption = true;
  //       this.processingFeeOption = true;
  //       this.autoVerifiedTripMenuOptions = false;
  //       this.expenseReportsMenuOption = true;
  //       this.regionMenuOption = true;
  //       this.userAttendanceLogListMenuOption = true;
  //       this.auditTrailListMenuOption = false;
  //
  //     }else if (this.role === 74){
  //       this.ZipCodeClusteringMenuOption = true;
  //       this.autoShiftConfigurationsMenuOption = true;
  //       this.creditNoteMenuOption = true;
  //       this.receivablesMenuOption = true;
  //       this.payoutDeductionsListMenuOption = true;
  //       this.cashTransfersMenuOption = true;
  //       this.userPlanDetailsListMenuOption = true;
  //       this.userMappingToZipCodesMenuOption = true;
  //       this.orderTrackingMenuOption = true;
  //       this.houseKeepingStaffMenuOption = true;
  //       this.cashClosureMenuOption = true;
  //       this.processingFeeOption = true;
  //       this.autoVerifiedTripMenuOptions = true;
  //       this.expenseReportsMenuOption = true;
  //       this.regionMenuOption = true;
  //       this.userAttendanceLogListMenuOption = true;
  //       this.vendorPaymentOption = true;
  //       this.auditTrailListMenuOption = false;
  //
  //     }else if (this.role === 40) {
  //       this.payoutDeductionsListMenuOption = false;
  //       this.ZipCodeClusteringMenuOption = true;
  //       this.autoShiftConfigurationsMenuOption = true;
  //       this.creditNoteMenuOption = false;
  //       this.userPlansMenuOption = false;
  //       this.cashTransfersMenuOption = true;
  //       this.userPlanDetailsListMenuOption = false;
  //       this.userMappingToZipCodesMenuOption = true;
  //       this.orderTrackingMenuOption = true;
  //       this.houseKeepingStaffMenuOption = true;
  //       this.cashClosureMenuOption = true;
  //       this.processingFeeOption = true;
  //       this.expenseReportsMenuOption = false;
  //       this.userAttendanceLogListMenuOption = true;
  //       this.autoVerifiedTripMenuOptions = true;
  //       this.auditTrailListMenuOption = false;
  //     } else if (this.role === 35) {
  //       this.ZipCodeClusteringMenuOption = true;
  //       this.creditNoteMenuOption = false;
  //       this.userPlansMenuOption = false;
  //       this.receivablesMenuOption = true;
  //       this.cashTransfersMenuOption = true;
  //       this.userPlanDetailsListMenuOption = false;
  //       this.userMappingToZipCodesMenuOption = true;
  //       this.orderTrackingMenuOption = true;
  //       this.cashClosureMenuOption = true;
  //       this.payoutDeductionsListMenuOption = false;
  //       this.processingFeeOption = true;
  //       this.expenseReportsMenuOption = false;
  //       this.userAttendanceLogListMenuOption = false;
  //       this.autoVerifiedTripMenuOptions = true;
  //       this.auditTrailListMenuOption = false;
  //     } else if (this.role === 31) {
  //       this.beneficiariesMenuOption = true;
  //       this.ZipCodeClusteringMenuOption = true;
  //       this.userMappingToZipCodesMenuOption = true;
  //       this.orderTrackingMenuOption = true;
  //       this.plansMenuOption = false;
  //       this.billingPlansMenuOption = false;
  //       this.whatsAppConversationsMenuOption = false;
  //       this.templateConfigurationsMenuOption = false;
  //       this.newShiftTemplateMenuOption = true;
  //       this.autoShiftConfigurationsMenuOption = true;
  //       this.creditNoteMenuOption = false;
  //       this.userPlansMenuOption = false;
  //       this.receivablesMenuOption = true;
  //       this.cashTransfersMenuOption = true;
  //       this.userPlanDetailsListMenuOption = false;
  //       this.houseKeepingStaffMenuOption = true;
  //       this.cashClosureMenuOption = true;
  //       this.payoutDeductionsListMenuOption = false;
  //       this.processingFeeOption = true;
  //       this.expenseReportsMenuOption = false;
  //       this.autoVerifiedTripMenuOptions = true;
  //       this.userAttendanceLogListMenuOption = true;
  //       this.auditTrailListMenuOption = false;
  //     } else if (this.role === 30) {
  //       this.autoShiftConfigurationsMenuOption = false;
  //       this.autoVerifiedTripMenuOptions = true;
  //       this.sitesMenuOption = false;
  //       this.eInvoiceMenuOption = false;
  //       this.ZipCodeClusteringMenuOption = false;
  //       this.userMappingToZipCodesMenuOption = false;
  //       this.orderTrackingMenuOption = false;
  //       this.whatsAppConversationsMenuOption = false;
  //       this.templateConfigurationsMenuOption = false;
  //       this.creditNoteMenuOption = false;
  //       this.userPlansMenuOption = false;
  //       this.machineLearningMenu = false;
  //       this.cashTransfersMenuOption = true;
  //       this.userPlanDetailsListMenuOption = false;
  //       this.cashClosureMenuOption = true;
  //       this.payoutDeductionsListMenuOption = false;
  //       this.processingFeeOption = true;
  //       this.userAttendanceLogListMenuOption = false;
  //       this.auditTrailListMenuOption = false;
  //     } else if (this.role === 29) {
  //       this.payoutDeductionsListMenuOption = false;
  //       this.payslipsMenu = false;
  //       this.referredListMenuOption = false;
  //       this.plansMenuOption = false;
  //       this.billingPlansMenuOption = false;
  //       this.operationsTrackingMenu = true;
  //       this.calendarShiftsMenuOption = true;
  //       this.userShiftsMenuOption = false;
  //       this.tripsMenuOption = false;
  //       this.packageTypesMenuOption = true;
  //       this.settingMenu = false;
  //       this.PayoutsMenu = true;
  //       this.plansMenuOption = true;
  //       this.advancePaymentMenuOption = true;
  //       this.finalPayoutMenuOption = true;
  //       this.paymentReportMenuOption = true;
  //       this.vouchersMenuOption = false;
  //       this.userPlansMenuOption = false;
  //       this.cashTransfersMenuOption = false;
  //       this.ReimbursementsMenuOption = true;
  //       this.eInvoiceMenuOption = true;
  //       this.newShiftTemplateMenuOption = false;
  //       this.templateConfigurationsMenuOption = false;
  //       this.updateShiftsMenuOption = false;
  //       this.userShiftAssignmentsMenuOption = false;
  //       this.packageTypesMenuOption = true;
  //       this.amazonDailyReportMenuOption = false;
  //       this.swiggyDistributionMenuOPtion = false;
  //       this.ZipCodeClusteringMenuOption = false;
  //       this.userMappingToZipCodesMenuOption = false;
  //       this.orderTrackingMenuOption = false;
  //       this.creditNoteMenuOption = true;
  //       this.userPlansMenuOption = false;
  //       this.vendorPaymentOption = true;
  //       this.machineLearningMenu = false;
  //       this.cashTransfersMenuOption = true;
  //       this.userPlanDetailsListMenuOption = true;
  //       this.houseKeepingStaffMenuOption = true;
  //       this.cashClosureMenuOption = false;
  //       this.userAttendanceLogListMenuOption = false;
  //       this.processingFeeOption = true;
  //       this.expenseReportsMenuOption = true;
  //       this.autoVerifiedTripMenuOptions = true;
  //       this.auditTrailListMenuOption = false;
  //     } else if (res.role === 28 || res.role === 72) {
  //       this.ZipCodeClusteringMenuOption = false;
  //       this.userMappingToZipCodesMenuOption = false;
  //       this.orderTrackingMenuOption = false;
  //       this.creditNoteMenuOption = false;
  //       this.userPlansMenuOption = false;
  //       this.machineLearningMenu = false;
  //       this.cashTransfersMenuOption = true;
  //       this.userPlanDetailsListMenuOption = false;
  //       this.houseKeepingStaffMenuOption = false;
  //       this.cashClosureMenuOption = true;
  //       this.expenseReportsMenuOption = false;
  //       this.userAttendanceLogListMenuOption = false;
  //       this.auditTrailListMenuOption = false;
  //     } else if (res.role === 27 || res.role === 70) {
  //       if (this.userDetails.id === '5e3080df80d0101a19689ffd') {
  //         this.userPlansMenuOption = false;
  //         this.userPlanDetailsListMenuOption = false;
  //       } else {
  //         this.onBoardingMenu = true;
  //         this.pendingUsersReportMenuOption = false;
  //         this.vehicleMasterMenuOption = false;
  //         this.fleetManagersMenuOption = false;
  //         this.beneficiariesMenuOption = false;
  //         this.operationsTrackingMenu = false;
  //         this.userPlansMenuOption = false;
  //         this.invoiceFleetMenuOption = false;
  //         this.invoiceICStaffMenuOption = false;
  //         this.clientsMenuOption = true;
  //         this.citiesMenuOption = false;
  //         this.ZipCodeClusteringMenuOption = false;
  //         this.userMappingToZipCodesMenuOption = false;
  //         this.clientUserIdsMenuOption = false;
  //         this.newShiftTemplateMenuOption = false;
  //         this.templateConfigurationsMenuOption = false;
  //         this.packageTypesMenuOption = false;
  //         this.updateShiftsMenuOption = false;
  //         this.userShiftAssignmentsMenuOption = false;
  //         this.notificationsMenu = false;
  //         this.settingMenu = false;
  //         this.reportMenu = true;
  //         this.analyticsMenu = false;
  //         this.searchUsersMenuOption = true;
  //         this.creditNoteMenuOption = true;
  //         this.userPlansMenuOption = false;
  //         this.receivablesMenuOption = true;
  //         this.machineLearningMenu = false;
  //         this.cashTransfersMenuOption = true;
  //         this.houseKeepingStaffMenuOption = true;
  //         this.cashClosureMenuOption = true;
  //         this.payoutDeductionsListMenuOption = false;
  //         this.amazonDailyReportMenuOption = false;
  //         this.shiftPerformanceReportMenuOption = false;
  //         this.tripSummaryReportsMenuOption = false;
  //         this.referredListMenuOption = false;
  //         this.userPlanDetailsListMenuOption = false;
  //         this.expenseReportsMenuOption = false;
  //         this.userAttendanceLogListMenuOption = false;
  //         this.auditTrailListMenuOption = false;
  //       }
  //     } else if (this.role === 26 || this.role === 25 || this.role === 19) {
  //       this.adminRole = true;
  //       this.headerRole = true;
  //       this.onBoardingMenu = false;
  //       this.operationsTrackingMenu = true;
  //       this.PayoutsMenu = true;
  //       this.payslipsMenu = false;
  //       this.setupMenu = false;
  //       this.notificationsMenu = false;
  //       this.settingMenu = false;
  //       this.reportMenu = true;
  //       this.amazonDailyReportMenuOption = false;
  //       this.shiftPerformanceReportMenuOption = false;
  //       this.tripSummaryReportsMenuOption = true;
  //       this.referredListMenuOption = false;
  //       this.analyticsMenu = false;
  //       this.creditNoteMenuOption = false;
  //       this.userPlansMenuOption = false;
  //       this.userShiftsMenuOption  = true;
  //       this.calendarShiftsMenuOption = false;
  //       this.userAttendanceLogListMenuOption = false;
  //       this.tripsMenuOption = false;
  //       this.dashboardMenuOption = false;
  //       this.machineLearningMenu = false;
  //       this.cashTransfersMenuOption = true;
  //       this.plansMenuOption = false;
  //       this.advancePaymentMenuOption = false;
  //       this.finalPayoutMenuOption = false;
  //       this.paymentReportMenuOption = false;
  //       this.vouchersMenuOption = false;
  //       this.userPlansMenuOption = false;
  //       this.ReimbursementsMenuOption = false;
  //       this.eInvoiceMenuOption = false;
  //       this.creditNoteMenuOption = false;
  //       this.receivablesMenuOption = false;
  //       this.vendorPaymentOption = false;
  //       this.userPlanDetailsListMenuOption = false;
  //       this.houseKeepingStaffMenuOption = false;
  //       this.cashClosureMenuOption = false;
  //       this.payoutDeductionsListMenuOption = false;
  //       this.expenseReportsMenuOption = false;
  //       this.auditTrailListMenuOption = false;
  //     } else {
  //       this.adminRole = false;
  //       this.headerRole = false;
  //       this.DashBoardCountDisabled = true;
  //     }
  //   });
  // }

  gotoUserProfile(): void {
    this.router.navigate(['users/userProfile', {userId: this.userDetails.id, status: 'Status'}]);
  }
}
