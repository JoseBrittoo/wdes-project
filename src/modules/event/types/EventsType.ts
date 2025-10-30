export interface Event {
  id?: number;         
  name: string;
  location: string;
  date: string;
  time: string;
  description?: string;  
  created_at?: string;   
  updated_at?: string; 
  event_link?: string;
  image_url?: string;
}
