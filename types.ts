import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  category: string;
  className?: string; // Para controle de grid (col-span, row-span)
}

export interface Testimonial {
  id: string;
  name: string;
  petName: string;
  text: string;
  avatarUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}