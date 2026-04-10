/*
 * Image recognition library tests
 */
package org.example;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.util.Map;

class LibraryTest {
    @Test void recognizeImageTest() {
        Library classUnderTest = new Library();
        // 测试非图片文件
        Map<String, Object> result = classUnderTest.recognizeImage("src/test/resources/test.txt");
        assertFalse((Boolean) result.get("success"));
        
        // 测试图片文件检查方法
        assertFalse(classUnderTest.isImage("src/test/resources/test.txt"));
    }
    
    @Test void isImageTest() {
        Library classUnderTest = new Library();
        // 测试非图片文件
        assertFalse(classUnderTest.isImage("src/test/resources/test.txt"));
    }
}
