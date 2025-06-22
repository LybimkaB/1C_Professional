import React from 'react';
import {Router, Route, Switch, Routes, BrowserRouter } from 'react-router-dom';
import Btn from './components/buttons/button';
import style from './main.module.css'

function Main(){
    return (
        <section className={style.main}>
            <div className={style.main_content}>
                <h3 className={style.title}>1C: Профессионал</h3>
                <Btn id="mistakes" btnClass="mistakes" text="Проработка ошибок"/>
                <Btn id="1" btnClass="chapter1" text="1. Общие механизмы, понятия и термины"/>
                <Btn id="2" btnClass="chapter2" text="2. Редакторы и инструменты общие"/>
                <Btn id="3" btnClass="chapter3" text="3. Редакторы и инструменты режима разработки"/>
                <Btn id="4" btnClass="chapter4" text="4. Конструкторы"/>
                <Btn id="5" btnClass="chapter5" text="5. Технология разработки"/>
                <Btn id="6" btnClass="chapter6" text="6. Объектная модель прикладного решения"/>
                <Btn id="7" btnClass="chapter7" text="7. Табличная модель прикладного решения"/>
                <Btn id="8" btnClass="chapter8" text="8. Механизмы интеграции и обмена данными"/>
                <Btn id="9" btnClass="chapter9" text="9. Обслуживание прикладного решения"/>
                <Btn id="10" btnClass="chapter10" text="10. Интерфейсные механизмы"/>
                <Btn id="11" btnClass="chapter11" text="11. Механизмы построения отчетности"/>
                <Btn id="12" btnClass="chapter12" text="12. Механизмы оперативного учета"/>
                <Btn id="13" btnClass="chapter13" text="13. Объекты и механизмы бухгалтерского учета"/>
                <Btn id="14" btnClass="chapter13" text="14. Механизмы сложных периодических расчетов"/>
            </div>
        </section>
    )
}

export default Main