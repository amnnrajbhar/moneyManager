import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly appUrl = 'https://moneymanager-jade.vercel.app';

  constructor(private title: Title, private meta: Meta) {}

  updateTitle(title: string): void {
    this.title.setTitle(title);
  }

  updateMetaTags(config: {
    title: string;
    description: string;
    keywords?: string;
    url?: string;
    image?: string;
  }): void {
    this.title.setTitle(config.title);
    
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'keywords', content: config.keywords || 'money manager, expense tracker, budget tracker, personal finance, manage money' });
    
    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: config.url || this.appUrl });
    this.meta.updateTag({ property: 'og:image', content: config.image || `${this.appUrl}/assets/og-image.png` });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    
    // Twitter
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image || `${this.appUrl}/assets/og-image.png` });
    
    // Canonical
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', config.url || this.appUrl);
  }
}
