package com.sgaraba.library.domain;

import static com.sgaraba.library.domain.BookTestSamples.*;
import static com.sgaraba.library.domain.BorrowedBookTestSamples.*;
import static com.sgaraba.library.domain.ClientTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.sgaraba.library.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BorrowedBookTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BorrowedBook.class);
        BorrowedBook borrowedBook1 = getBorrowedBookSample1();
        BorrowedBook borrowedBook2 = new BorrowedBook();
        assertThat(borrowedBook1).isNotEqualTo(borrowedBook2);

        borrowedBook2.setId(borrowedBook1.getId());
        assertThat(borrowedBook1).isEqualTo(borrowedBook2);

        borrowedBook2 = getBorrowedBookSample2();
        assertThat(borrowedBook1).isNotEqualTo(borrowedBook2);
    }

    @Test
    void bookTest() throws Exception {
        BorrowedBook borrowedBook = getBorrowedBookRandomSampleGenerator();
        Book bookBack = getBookRandomSampleGenerator();

        borrowedBook.setBook(bookBack);
        assertThat(borrowedBook.getBook()).isEqualTo(bookBack);

        borrowedBook.book(null);
        assertThat(borrowedBook.getBook()).isNull();
    }

    @Test
    void clientTest() throws Exception {
        BorrowedBook borrowedBook = getBorrowedBookRandomSampleGenerator();
        Client clientBack = getClientRandomSampleGenerator();

        borrowedBook.setClient(clientBack);
        assertThat(borrowedBook.getClient()).isEqualTo(clientBack);

        borrowedBook.client(null);
        assertThat(borrowedBook.getClient()).isNull();
    }
}
