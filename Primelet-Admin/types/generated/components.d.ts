import type { Schema, Struct } from '@strapi/strapi';

export interface OrderItemOrderItem extends Struct.ComponentSchema {
  collectionName: 'components_order_item_order_items';
  info: {
    displayName: 'Order-item';
  };
  attributes: {
    amount: Schema.Attribute.Decimal;
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    quantity: Schema.Attribute.Integer;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'order-item.order-item': OrderItemOrderItem;
    }
  }
}
