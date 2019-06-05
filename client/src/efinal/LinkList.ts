class LinkList {
		
	 	// var Node = function (element) {　　　　　　　　//新元素构造
        //     this.element = element;
        //     this.next = null;
        // };
		
        // var length = 0;
        // var head = null;

        // this.append = function (element) {
        //     var node = new Node(element);　　　　　　　　//构造新的元素节点
        //     var current;
        //     if (head === null) {　　　　　　　　　　　　　//头节点为空时  当前结点作为头节点
        //         head = node;
        //     } else {
        //         current = head;　　　　　　　　　　　　　　
        //         while (current.next) {　　　　　　　　　　//遍历，直到节点的next为null时停止循环，当前节点为尾节点
        //             current = current.next;
        //         }
        //         current.next = node;　　　　　　　　　　　　//将尾节点指向新的元素，新元素作为尾节点
        //     }           
        //     length++;　　　　　　　　　　　　　　　　　　　　//更新链表长度
        // };
        // this.removeAt = function (position) {
        //     if (position > -1 && position < length) {
        //         var current = head;
        //         var index = 0;
        //         var previous;
        //         if (position == 0) {
        //             head = current.next;
        //         } else {
        //             while (index++ < position) {
        //                 previous = current;
        //                 current = current.next;
        //             }
        //             previous.next = current.next;
        //         }
        //         length--;
        //         return current.element;
        //     } else {
        //         return null;
        //     }
        // };
        // this.insert = function (position, element) {
        //     if (position > -1 && position <= length) {　　　　　　　　//校验边界
        //         var node = new Node(element);　　　　　　　　
        //         current = head;
        //         var index = 0;
        //         var previous;
        //         if (position == 0) {　　　　　　　　　　　　　　　　　　　　//作为头节点，将新节点的next指向原有的头节点。
        //             node.next = current;
        //             head = node;　　　　　　　　　　　　　　　　　　　　　　　　//新节点赋值给头节点
        //         } else {
        //             while (index++ < position) {
        //                 previous = current;
        //                 current = current.next;
        //             }　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　//遍历结束得到当前position所在的current节点，和上一个节点
        //             previous.next = node;　　　　　　　　　　　　　　　　　　　　//上一个节点的next指向新节点  新节点指向当前结点，可以参照上图来看
        //             node.next = current;
        //         }
        //         length++;
        //         return true;
        //     } else {
        //         return false;
        //     }

        // };
        // this.toString = function () {
        //     var current = head;
        //     var string = '';
        //     while (current) {
        //         string += ',' + current.element;
        //         current = current.next;
        //     }
        //     return string;
        // };
        // this.indexOf = function (element) {
        //     var current = head;
        //     var index = -1;
        //     while (current) {
        //         if (element === current.element) {　　　　　　　　　　　　//从头节点开始遍历
        //             return index;
        //         }
        //         index++;
        //         current = current.next;
        //     }
        //     return -1;
        // };
        // this.getLength = function () {
        //     return length;
        // }

}