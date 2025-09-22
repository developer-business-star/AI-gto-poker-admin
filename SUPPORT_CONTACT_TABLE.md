# Support Contact Table Documentation

## Overview

The Support Contact Table is a comprehensive, flexible React component designed for managing support tickets in the admin panel. It provides powerful features for viewing, filtering, sorting, and managing customer support requests.

## Features

### ✅ Core Features
- **Real-time Data Fetching**: Automatically fetches support tickets from the backend API
- **Advanced Filtering**: Filter by status, type, priority, and search across multiple fields
- **Smart Sorting**: Click any column header to sort data (ascending/descending)
- **Pagination**: Configurable page sizes with navigation controls
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Actions**: View, reply, and close tickets directly from the table

### ✅ UI/UX Features
- **Modern Glass-morphism Design**: Beautiful backdrop blur effects with transparency
- **Color-coded Priorities**: Visual indicators for urgent, high, medium, and low priorities
- **Status Badges**: Clear visual status indicators (open/closed)
- **Type Icons**: Emoji icons to distinguish between general support and feature requests
- **Loading States**: Smooth loading animations and error handling
- **Detailed Modal**: Click any ticket to view full details in a modal popup

### ✅ Flexibility Options
- **Configurable Page Size**: Set custom number of items per page
- **Optional Components**: Show/hide filters and pagination as needed
- **Custom Callbacks**: Handle ticket selection with custom functions
- **Styling Options**: Easy to customize with additional CSS classes

## Usage

### Basic Implementation

```tsx
import SupportContactTable from '../../../components/SupportContactTable';

export default function SupportPage() {
  const handleTicketSelect = (ticket) => {
    console.log('Selected ticket:', ticket);
    // Handle ticket selection (open modal, navigate, etc.)
  };

  return (
    <div>
      <SupportContactTable 
        onTicketSelect={handleTicketSelect}
        showFilters={true}
        showPagination={true}
        pageSize={15}
      />
    </div>
  );
}
```

### Advanced Configuration

```tsx
<SupportContactTable 
  className="custom-table-styles"
  showFilters={true}           // Show/hide filter controls
  showPagination={true}        // Show/hide pagination
  pageSize={20}               // Items per page (default: 10)
  onTicketSelect={handleSelect} // Callback for ticket selection
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Additional CSS classes |
| `showFilters` | `boolean` | `true` | Show filter controls |
| `showPagination` | `boolean` | `true` | Show pagination controls |
| `pageSize` | `number` | `10` | Number of items per page |
| `onTicketSelect` | `function` | `undefined` | Callback when ticket is selected |

## Data Structure

The component expects tickets with the following structure:

```typescript
interface SupportTicket {
  id: string;
  ticketId: string;                    // e.g., "SUP-20250922-00001"
  type: 'general' | 'feature_request';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'closed';
  subject: string;
  description: string;
  userEmail: string;
  userFullName?: string;
  responses: any[];
  createdAt: string;                   // ISO date string
  updatedAt: string;                   // ISO date string
  closedAt?: string;                   // ISO date string
  ageInDays: number;
  statusDisplay: string;
}
```

## API Integration

The component fetches data from `/api/support/tickets` endpoint. The API should return:

```json
{
  "success": true,
  "tickets": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalTickets": 42,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Filtering & Searching

### Available Filters
- **Status**: All, Open, Closed
- **Type**: All, General, Feature Request
- **Priority**: All, Urgent, High, Medium, Low
- **Search**: Searches across subject, email, ticket ID, and user name

### Search Functionality
The search is case-insensitive and searches across:
- Ticket subject
- User email
- Ticket ID
- User full name

## Sorting

Click any column header to sort:
- **First click**: Sort descending
- **Second click**: Sort ascending
- **Visual indicators**: Arrow shows current sort direction

### Sortable Columns
- Ticket ID
- Type
- Priority
- Status
- Subject
- Contact (User Email)
- Created Date

## Styling & Theming

The component uses Tailwind CSS with a dark theme and glass-morphism effects:

- **Background**: Semi-transparent with backdrop blur
- **Colors**: Consistent with admin panel theme
- **Responsive**: Mobile-first design approach
- **Animations**: Smooth transitions and hover effects

### Color Coding

**Priority Colors:**
- 🔴 Urgent: Red (`text-red-400`)
- 🟠 High: Orange (`text-orange-400`)
- 🟡 Medium: Yellow (`text-yellow-400`)
- 🟢 Low: Green (`text-green-400`)

**Status Colors:**
- 🔵 Open: Blue (`text-blue-400`)
- ⚪ Closed: Gray (`text-gray-400`)

## Error Handling

- **Loading States**: Shows spinner during data fetch
- **Error States**: Displays error message with retry button
- **Empty States**: Shows appropriate message when no data
- **Network Issues**: Graceful fallback to mock data if backend unavailable

## Performance Features

- **Memoized Filtering**: Uses `useMemo` for efficient filtering/sorting
- **Optimized Rendering**: Only re-renders when necessary
- **Pagination**: Reduces DOM load by showing limited items
- **Lazy Loading**: Efficient data fetching strategies

## Accessibility

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Meets WCAG guidelines for readability
- **Focus Management**: Clear focus indicators

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Integration Notes

1. **Backend Requirements**: Ensure your backend supports the expected API endpoints
2. **Environment Variables**: Set `BACKEND_URL` in your environment
3. **Mock Data**: Component includes fallback mock data for development
4. **TypeScript**: Full TypeScript support with proper type definitions

## Troubleshooting

### Common Issues

1. **No data showing**: Check API endpoint and network connectivity
2. **Styling issues**: Ensure Tailwind CSS is properly configured
3. **TypeScript errors**: Verify all required props are provided
4. **Performance**: Consider reducing `pageSize` for large datasets

### Debug Mode

Enable debug logging by adding to your component:

```tsx
useEffect(() => {
  console.log('Tickets loaded:', tickets.length);
  console.log('Filters applied:', { statusFilter, typeFilter, priorityFilter });
}, [tickets, statusFilter, typeFilter, priorityFilter]);
```

## Future Enhancements

Potential improvements for future versions:

- **Real-time Updates**: WebSocket integration for live updates
- **Bulk Actions**: Select multiple tickets for batch operations
- **Export Features**: CSV/Excel export functionality
- **Advanced Filters**: Date range, assignee, custom fields
- **Drag & Drop**: Reorder tickets or change priorities
- **Keyboard Shortcuts**: Power user keyboard navigation
- **Customizable Columns**: Show/hide specific columns
- **Saved Filters**: Store and recall common filter combinations

---

*This component was designed to be both powerful and flexible, providing a solid foundation for support ticket management while remaining easy to customize and extend.*