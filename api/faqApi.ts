import axiosInstance from './axios';
import { ApiResponse } from './courseApi';

// FAQ API Types
export interface FAQListPayload {
  search?: string;
  faq_category_id?: number;
  type: 'school' | 'student' | 'teacher';
  page: number;
  limit: number;
  sort_by: string;
  sort_order: 'asc' | 'desc';
}

export interface UpdatedUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface FAQCategory {
  id: number;
  name: string;
}

export interface FAQItem {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  faq_category_id: number;
  faqs_for: string[];
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  updated_user: UpdatedUser;
  faq_category: FAQCategory;
}

export interface FAQListData {
  faqs_list: FAQItem[];
  total_records: number;
}

// API Function
export const fetchFAQList = async (
  payload: FAQListPayload
): Promise<{ faqs: FAQItem[]; totalRecords: number }> => {
  try {
    const response = await axiosInstance.post<ApiResponse<FAQListData>>('/faq/list', payload);

    // Extract data from response
    const responseData = response.data?.data;

    // Return empty array if data is null, undefined, or faqs_list is invalid
    if (!responseData || !Array.isArray(responseData.faqs_list)) {
      return { faqs: [], totalRecords: 0 };
    }

    // Filter out deleted or inactive FAQs
    const activeFAQs = responseData.faqs_list.filter(
      (faq) => faq.is_active && !faq.is_deleted
    );

    return {
      faqs: activeFAQs,
      totalRecords: responseData.total_records || 0
    };
  } catch (error) {
    console.error('Error fetching FAQ list:', error);
    // Return empty array on error
    return { faqs: [], totalRecords: 0 };
  }
};

