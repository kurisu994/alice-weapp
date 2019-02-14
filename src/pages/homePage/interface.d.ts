declare namespace Account {

  interface Account{
    /**
     * id
     */
    id: number;
    /**
     * 名称
     */
    name: string;
    /**
     * 账号名
     */
    account: string;
    /**
     * 密码
     */
    cipherCode: string;
    /**
     * 账号类型
     */
    accountType: number;
    /**
     * 备注
     */
    remark: string;
    /**
     * 创建时间
     */
    createTime: string;
    /**
     * 修改时间
     */
    updateTime: string;
  }

  interface Detail {
    /**
     * id
     */
    id: number;
    /**
     * 名称
     */
    name: string;
    /**
     * 账号名
     */
    account: string;
    /**
     * 密码
     */
    cipherCode: string;
    /**
     * 额外信息
     */
    extra: string;
    /**
     * 账号类型
     */
    accountType: number;
    /**
     * 备注
     */
    remark: string;
    /**
     * 创建时间
     */
    createTime: string;
    /**
     * 修改时间
     */
    updateTime: string;
  }
}
