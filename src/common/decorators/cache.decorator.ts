import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

export function CacheManager(prefix: string, ttl: number, key: any) {
  const injectCacheManager = Inject(CACHE_MANAGER);

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    injectCacheManager(target, 'cacheManager');
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const cacheKey = `${prefix}-${process.env.NODE_ENV}-${
        args[0] ? args[0][key] : key
      }`;
      const cachedResult = await this.cacheManager.get(cacheKey);
      if (cachedResult) {
        return JSON.parse(cachedResult);
      }
      const result = await originalMethod.apply(this, args);
      await this.cacheManager.set(cacheKey, JSON.stringify(result), {
        ttl: ttl,
      });

      return result;
    };

    return descriptor;
  };
}
