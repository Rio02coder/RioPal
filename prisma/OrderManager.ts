import OrderDatabase from "../Database/Order";
import { noIdOrder, Order } from "../types/Order";
import { prisma } from "./client";

/**
 * This class is an implementation of the OrderDatabase.
 * This implements all the DB operations on an order.
 */
class OrderManager implements OrderDatabase {
  /**
   * Method to add an id less order to the db.
   * @param order The id less order passed
   * @returns a Promise containing the Order with the id.
   */
  public addOrder(order: noIdOrder): Promise<Order> {
    return prisma.order
      .create({ data: { ...order, hasPaid: false } })
      .then((order) => order as Order)
      .catch(() => {
        // This handles cases where the order schema passed is incorrect.
        throw new Error(
          "Order details seem to be incorrect. This could happen if the product Id is wrong or the details passed are incorrect."
        );
      });
  }

  /**
   * Method to delete an order from the db.
   * @param orderId A number representing the order to delete
   * @returns A promise containing the deleted order.
   */
  public deleteOrder(orderId: number): Promise<Order> {
    return prisma.order
      .delete({
        where: { id: orderId },
      })
      .then((order) => order as Order)
      .catch(() => {
        // This handles the case where the order id is not found.
        throw new Error("The order id to delete is not found.");
      });
  }

  /**
   * Method to get an order from the db.
   * @param orderId A number representing the order to retrieve.
   * @returns A promise containing the order or null.
   */
  public getOrder(orderId: number): Promise<Order | null> {
    return prisma.order
      .findUnique({
        where: { id: orderId },
      })
      .then((order) => order)
      .catch(() => {
        // The order id is not found.
        throw new Error("The order id is not found.");
      });
  }

  /**
   * Method to complete the payment for an order.
   * @param orderId A number representing the order to pay for.
   * @param paymentRef A string containing the payment amount.
   * @returns A promise of boolean.
   */
  public completePaymentForOrder(
    orderId: number,
    paymentRef: string
  ): Promise<Boolean> {
    return this.getOrder(orderId).then((order) => {
      if (!order) {
        throw new Error("Order id does not exist");
      }

      if (order.hasPaid) {
        throw new Error("Order is already paid for");
      }
      if (order.price != Number(paymentRef)) {
        throw new Error("Incorrect amount has been sent for the order");
      }
      return prisma.order
        .update({
          where: { id: orderId },
          data: { hasPaid: true },
        })
        .then(() => true)
        .catch(() => {
          throw new Error(
            "Some error occurred with the payment. Please try again after some time."
          );
        });
    });
  }
}

export default OrderManager;
