import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.makeugc.in';

    // Standard routes
    const routes = [
        '',
        '/brands',
        '/creators',
        '/pricing',
        '/how-it-works',
        '/ai-ugc',
        '/contact',
        '/about',
        '/blog',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Add dynamic blog routes (to be fetched from a real CMS / Database)
    // Example: const posts = await fetchPosts(); posts.map(...)
    // For now, these are dummy routes as placeholders based on the blueprint
    const blogRoutes = [
        '/blog/what-is-ugc-2025',
        '/blog/how-to-brief-creator',
        '/blog/ugc-vs-influencer',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...routes, ...blogRoutes];
}
