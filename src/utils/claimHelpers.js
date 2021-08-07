export const nextStatus = claim => {
  switch(claim.status) {
    case 'Pending':
      return { status: 'Verified', label: 'Verify' };
    case 'Verified':
      return { status: 'Approved', label: 'Approve' };
    case 'Approved':
      return { status: 'Paid', label: 'Confirm Payment' };
    default:
      return;
  }
}

export const headingTitle = status => {
  switch(status) {
    case 'pending':
      return 'Pending Claims';
    case 'verified':
      return 'Verified Claims';
    case 'approved':
      return 'Approved Claims';
    case 'paid':
      return 'Paid Claims';
    case 'cancelled':
      return 'Cancelled Claims';
    default:
      return;
  }
}