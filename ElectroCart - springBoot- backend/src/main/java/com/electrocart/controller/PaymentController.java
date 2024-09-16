package com.electrocart.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.electrocart.entity.Payment;
import com.electrocart.service.PaymentService;



@CrossOrigin(origins = "http://localhost:4200")

@RestController // is controller which provides different end points to access the services
@RequestMapping("/api/payements")
public class PaymentController {
	@Autowired
	private PaymentService paymentService;

	@PostMapping("{orderId}/{customerId}")
	public ResponseEntity<Payment> addPayment(@RequestBody Payment payment, @PathVariable long orderId,
			@PathVariable long customerId) {

		return new ResponseEntity<Payment>(paymentService.addPayment(payment, orderId,customerId),
				HttpStatus.CREATED);
	}

	// getting list of payements
	@GetMapping
	public List<Payment> getAlPayments() {
		return paymentService.getAllPayments();
	}

	// to get payement by payement id(for receipt)

	@GetMapping("{paymentId}")
	public ResponseEntity<Payment> getPaymentById(@PathVariable("paymentId") long paymentId) {
		return new ResponseEntity<Payment>(paymentService.getPaymentById(paymentId), HttpStatus.OK);
	}

// to delete payement
	@DeleteMapping("{paymentId}")
	public ResponseEntity<Boolean> deletePayment(@PathVariable("paymentId") long paymentId) {
		paymentService.deletePayment(paymentId);
		boolean flag = true;
		return new ResponseEntity<Boolean>(flag, HttpStatus.OK);
	}
}