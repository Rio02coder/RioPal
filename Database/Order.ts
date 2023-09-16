import { noIdOrder, Order } from "../types/Order";

export default interface OrderDatabase {
  /**
   * Method for adding an order to the database.
   * @param order - This contains all attributes of an order except it's id.
   * This is because we do not allow consumers of this method to add a self described id to an order.
   * @returns A promise of Order. This order contains the id received after adding it to the db.
   */
  addOrder(order: noIdOrder): Promise<Order>;

  /**
   * Method to delete a specific order
   * @param orderId This is a number representing the order id
   * @returns A promise of the deleted order.
   */
  deleteOrder(orderId: Order["id"]): Promise<Order>;

  /**
   * Method to get a specific order
   * @param orderId This is a number representing the order id
   * @returns A promise of the Order or null.
   */
  getOrder(orderId: Order["id"]): Promise<Order | null>;

  /**
   * This method completes the payment for an order
   * @param orderId The order id for which payment is being completed
   * @param paymentReference The payment reference from the bank having
   * details of the payment amount.
   * @returns A promise of boolean.
   */
  completePaymentForOrder(
    orderId: Order["id"],
    paymentReference: string
  ): Promise<Boolean>;
}
